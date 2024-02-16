"use client";
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

export default class PhraseQuestionExtractor {
  constructor(minLength = 2, maxLength = 4) {
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  extractPhrasesAndQuestions(paragraph) {
    const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [];
    const phrases = new Set();
    const questions = [];

    sentences.forEach((sentence) => {
      if (sentence.trim().endsWith("?")) {
        questions.push(sentence.trim());
      } else {
        const tokens = tokenizer.tokenize(sentence);
        for (let n = this.minLength; n <= this.maxLength; n++) {
          for (let i = 0; i < tokens.length - n + 1; i++) {
            const gram = tokens.slice(i, i + n);
            const phrase = gram.join(" ");
            phrases.add(phrase);
          }
        }
      }
    });

    const combinedList = Array.from(new Set([...phrases, ...questions]));
    return combinedList;
  }
}
