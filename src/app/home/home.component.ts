import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    FooterComponent,
    LanguageSelectorComponent,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Font size properties
  fontSize = 1;
  readonly minSize = 0.8;
  readonly maxSize = 1.5;
  readonly step = 0.1;

  // Translation properties
  private readonly endpoint = 'https://api.cognitive.microsofttranslator.com';
  private readonly apiVersion = '3.0';
  private subscriptionKey = 'FUwnTjVqNvv46l4jiTUigGnzqgBZawpCAOipfcwXhdFQhapfWW3eJQQJ99BDACqBBLyXJ3w3AAAbACOGRNOJ';
  private region = 'southeastasia';
  private originalTexts: Map<HTMLElement, string> = new Map();
  private currentLanguage = 'en';

  // Search properties
  @ViewChild('searchInput') searchInput!: ElementRef;
  allSuggestions = [
    'License Related Services',
    'Vehicle Related Services',
    'Manufacturer Related Services',
    'Other Services',
    'Dashboard'
  ];
  filteredSuggestions: string[] = [];
  showSuggestions = false;
  showNoResults = false;
  currentSearchTerm = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.storeOriginalTexts();
  }

  // Theme methods
  setTheme(theme: string, lighttheme: string) {
    document.documentElement.style.setProperty('--primary-color', theme);
    document.documentElement.style.setProperty('--light-color', lighttheme);
    // const bgcolor = document.getElementsByClassName('bg-color');
    // const bglightcolor = document.getElementsByClassName('bg-lightcolor');
    // const textcolor = document.getElementsByClassName('font-color');
    
    // if (bgcolor && bgcolor.length > 0) {
    //   Array.from(bgcolor).forEach(bgcolor => {
    //     this.renderer.setStyle(bgcolor, 'background-color', theme);
    //   });
    //   Array.from(bglightcolor).forEach(bglightcolor => {
    //     this.renderer.setStyle(bglightcolor, 'background-color', lighttheme);
    //   });
    //   Array.from(textcolor).forEach(textcolor => {
    //     this.renderer.setStyle(textcolor, 'color', theme);
    //   });
    // } else {
    //   console.error('No elements with class "bg-color" found in the DOM.');
    // }
  }

  // Font size methods
  decreaseFont() {
    this.fontSize = Math.max(this.fontSize - this.step, this.minSize);
    this.updateFontSize();
  }

  increaseFont() {
    this.fontSize = Math.min(this.fontSize + this.step, this.maxSize);
    this.updateFontSize();
  }

  resetFont() {
    this.fontSize = 1;
    this.updateFontSize();
  }

  private updateFontSize() {
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}rem`);
  }

  // Search methods
  onSearchInput(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    if (searchTerm.length > 0) {
      this.filteredSuggestions = this.allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.showSuggestions = true;
      this.showNoResults = this.filteredSuggestions.length === 0;
    } else {
      this.showSuggestions = false;
      this.showNoResults = false;
    }
  }

  selectSuggestion(suggestion: string) {
    this.searchInput.nativeElement.value = suggestion;
    this.search(suggestion);
    this.showSuggestions = false;
  }

  search(searchTerm: string) {
    this.showSuggestions = false;
    
    if (searchTerm && this.allSuggestions.some(s => 
        s.toLowerCase() === searchTerm.toLowerCase())) {
      // Navigate to appropriate route
      const routeMap: Record<string, string> = {
        'License Related Services': '/license',
        'Vehicle Related Services': '/vehicle',
        'Manufacturer Related Services': '/manufacturer',
        'Other Services': '/other',
        'Dashboard': '/dashboard'
      };
      
      const route = routeMap[searchTerm];
      if (route) {
        this.router.navigate([route]);
      }
    } else if (searchTerm) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }

  // Translation methods
  async onLanguageSelected(targetLanguage: string) {
    if (targetLanguage === this.currentLanguage) return;
    
    if (targetLanguage === 'en') {
      this.restoreOriginalTexts();
      this.currentLanguage = 'en';
      return;
    }
    
    try {
      console.log('Translating to:', targetLanguage);
      await this.translatePage(targetLanguage);
      this.currentLanguage = targetLanguage;
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  private storeOriginalTexts() {
    const elements = this.getTextElements();
    elements.forEach(el => {
      const text = el.textContent?.trim() || '';
      if (text) {
        this.originalTexts.set(el, text);
      }
    });
  }

  private restoreOriginalTexts() {
    this.originalTexts.forEach((text, element) => {
      this.renderer.setProperty(element, 'textContent', text);
    });
    this.renderer.setAttribute(document.documentElement, 'lang', 'en');
  }

  public async translatePage(targetLanguage: string) {
    const translatableElements = this.getTextElements();
    const textsToTranslate: string[] = [];
    const elementTextMap = new Map<HTMLElement, string>();

    translatableElements.forEach(el => {
      const originalText = this.originalTexts.get(el) || el.textContent?.trim() || '';
      if (originalText) {
        textsToTranslate.push(originalText);
        elementTextMap.set(el, originalText);
      }
    });

    if (textsToTranslate.length === 0) return;

    const translations = await this.translateTexts(textsToTranslate, targetLanguage);
    this.applyTranslations(elementTextMap, translations);
    
    this.renderer.setAttribute(document.documentElement, 'lang', targetLanguage);
  }

  private getTextElements(): HTMLElement[] {
    return Array.from(this.el.nativeElement.querySelectorAll('*'))
      .filter((el: any) => {
        const hasText = el.childNodes.length === 1 && 
                       el.childNodes[0].nodeType === Node.TEXT_NODE &&
                       el.textContent.trim().length > 0;
        const isTranslatable = !['INPUT', 'SCRIPT', 'STYLE'].includes(el.tagName) && 
                             !el.classList.contains('no-translate') &&
                             el.getAttribute('translate') !== 'no';
        return hasText && isTranslatable;
      }) as HTMLElement[];
  }

  private async translateTexts(texts: string[], targetLanguage: string): Promise<string[]> {
    const body = texts.map(text => ({ Text: text }));
    const url = `${this.endpoint}/translate?api-version=${this.apiVersion}&to=${targetLanguage}`;

    const response = await this.http.post<any[]>(url, body, {
      headers: {
        'Ocp-Apim-Subscription-Key': this.subscriptionKey,
        'Ocp-Apim-Subscription-Region': this.region,
        'Content-Type': 'application/json'
      }
    }).toPromise();

    return response?.map(item => item.translations[0].text) || [];
  }

  private applyTranslations(elementTextMap: Map<HTMLElement, string>, translations: string[]) {
    const textsArray = Array.from(elementTextMap.values());
    const translationMap = new Map<string, string>();
    
    textsArray.forEach((text, index) => {
      if (index < translations.length) {
        translationMap.set(text, translations[index]);
      }
    });

    elementTextMap.forEach((text, element) => {
      if (translationMap.has(text)) {
        this.renderer.setProperty(element, 'textContent', translationMap.get(text));
      }
    });
  }
}