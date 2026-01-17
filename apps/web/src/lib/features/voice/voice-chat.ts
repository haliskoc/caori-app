/**
 * Voice Chat Utilities
 * Provides speech recognition and synthesis for AI chat
 * Uses Web Speech API (free, browser-native)
 */

// Type definitions for Web Speech API
type SpeechRecognitionEvent = {
  results: {
    isFinal: boolean;
    [index: number]: {
      transcript: string;
      confidence: number;
    };
  }[];
  resultIndex: number;
};

type SpeechRecognitionErrorEvent = {
  error: string;
  message: string;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

/**
 * Get Speech Recognition constructor (cross-browser)
 */
export function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") {
    return null;
  }

  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

/**
 * Check if speech recognition is supported
 */
export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognition() !== null;
}

/**
 * Check if speech synthesis is supported
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Speech Recognition Manager
 */
export class VoiceChatRecognition {
  private recognition: SpeechRecognitionInstance | null = null;
  private isListening = false;
  private onTranscriptCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor(locale = "tr-TR") {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      return;
    }

    this.recognition = new Recognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = locale;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results;
      const lastResult = results[event.resultIndex];
      
      if (lastResult) {
        const transcript = lastResult[0].transcript;
        const isFinal = lastResult.isFinal;
        
        if (this.onTranscriptCallback) {
          this.onTranscriptCallback(transcript, isFinal);
        }
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      
      let errorMessage = "Ses tanıma hatası";
      
      switch (event.error) {
        case "no-speech":
          errorMessage = "Ses algılanamadı. Lütfen tekrar deneyin.";
          break;
        case "audio-capture":
          errorMessage = "Mikrofon erişimi sağlanamadı.";
          break;
        case "not-allowed":
          errorMessage = "Mikrofon izni reddedildi.";
          break;
        case "network":
          errorMessage = "Ağ bağlantısı hatası.";
          break;
        case "aborted":
          // User stopped, not an error
          return;
      }
      
      if (this.onErrorCallback) {
        this.onErrorCallback(errorMessage);
      }
      
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    };
  }

  start() {
    if (!this.recognition || this.isListening) {
      return;
    }

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error("Failed to start recognition:", error);
      if (this.onErrorCallback) {
        this.onErrorCallback("Ses tanıma başlatılamadı");
      }
    }
  }

  stop() {
    if (!this.recognition || !this.isListening) {
      return;
    }

    try {
      this.recognition.stop();
    } catch (error) {
      console.error("Failed to stop recognition:", error);
    }
  }

  abort() {
    if (!this.recognition) {
      return;
    }

    try {
      this.recognition.abort();
      this.isListening = false;
    } catch (error) {
      console.error("Failed to abort recognition:", error);
    }
  }

  onTranscript(callback: (transcript: string, isFinal: boolean) => void) {
    this.onTranscriptCallback = callback;
  }

  onError(callback: (error: string) => void) {
    this.onErrorCallback = callback;
  }

  onEnd(callback: () => void) {
    this.onEndCallback = callback;
  }

  getIsListening() {
    return this.isListening;
  }

  isSupported() {
    return this.recognition !== null;
  }
}

/**
 * Speech Synthesis Manager
 */
export class VoiceChatSynthesis {
  private synthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  /**
   * Speak text with Turkish voice
   */
  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number; lang?: string }) {
    if (!this.synthesis) {
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || "tr-TR";
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;
    utterance.volume = options?.volume || 1.0;

    // Try to find Turkish voice
    const voices = this.synthesis.getVoices();
    const turkishVoice = voices.find(
      (voice) => voice.lang.startsWith("tr") || voice.lang.startsWith("TR")
    );
    
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  /**
   * Stop current speech
   */
  stop() {
    if (!this.synthesis) {
      return;
    }

    this.synthesis.cancel();
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  /**
   * Pause current speech
   */
  pause() {
    if (!this.synthesis || !this.isSpeaking) {
      return;
    }

    this.synthesis.pause();
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (!this.synthesis) {
      return;
    }

    this.synthesis.resume();
  }

  getIsSpeaking() {
    return this.isSpeaking;
  }

  isSupported() {
    return this.synthesis !== null;
  }

  /**
   * Get available voices
   */
  getVoices() {
    if (!this.synthesis) {
      return [];
    }

    return this.synthesis.getVoices();
  }

  /**
   * Get Turkish voices
   */
  getTurkishVoices() {
    return this.getVoices().filter(
      (voice) => voice.lang.startsWith("tr") || voice.lang.startsWith("TR")
    );
  }
}
