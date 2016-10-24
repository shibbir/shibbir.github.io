---
layout: post
title: "Lexical Analyzer"
date: 2011-01-08 20:04:00 +0600
tags: C/C++
category: C/C++
excerpt: I'm doing compiler course in my current semester (Fall' 10). The programs I'm doing for the lab classes were not fully optimized and in fact not very efficient too. For example, I've created a Lexical Analyzer in C++, where no error detection module was present. And, also the program was not fully completed, it doesn't recognize structure, while loop etc
---

I'm doing compiler course in my current semester (Fall' 10). The programs I'm doing for the lab classes were not fully optimized and in fact not very efficient too. For example, I've created a **Lexical Analyzer** in C++, where no error detection module was present. And, also the program was not fully completed, it doesn't recognize structure, while loop etc.

But I've code it in a way so that this features can be added without making a significant change (at least I'm trying). All programs are successfully compiled and tested in Microsoft Visual C++ 2006.

## From Wikipedia

> In computer science, lexical analysis is the process of converting a sequence of characters (such as in a computer program or web page) into a sequence of tokens (strings with an identified "meaning"). A program that performs lexical analysis may be called a lexer, tokenizer, or scanner (though "scanner" is also used to refer to the first stage of a lexer). Such a lexer is generally combined with a parser, which together analyze the syntax of programming languages, web pages, and so forth.

```cpp
#include<stdio.h>
#include<string.h>
#include<ctype.h>
 
bool KEYWORD(char word[]) {
 
    if(strcmp(word, "auto") == 0)       return true;
    if(strcmp(word, "break") == 0)      return true;
    if(strcmp(word, "case") == 0)       return true;
    if(strcmp(word, "char") == 0)       return true;
    if(strcmp(word, "const") == 0)      return true;
    if(strcmp(word, "continue") == 0)   return true;
    if(strcmp(word, "default") == 0)    return true;
    if(strcmp(word, "do") == 0)         return true;
    if(strcmp(word, "double") == 0)     return true;
    if(strcmp(word, "else") == 0)       return true;
    if(strcmp(word, "enum") == 0)       return true;
    if(strcmp(word, "extern") == 0)     return true;
    if(strcmp(word, "float") == 0)      return true;
    if(strcmp(word, "for") == 0)        return true;
    if(strcmp(word, "goto") == 0)       return true;
    if(strcmp(word, "if") == 0)         return true;
    if(strcmp(word, "int") == 0)        return true;
    if(strcmp(word, "long") == 0)       return true;
    if(strcmp(word, "register") == 0)   return true;
    if(strcmp(word, "return") == 0)     return true;
    if(strcmp(word, "short") == 0)      return true;
    if(strcmp(word, "signed") == 0)     return true;
    if(strcmp(word, "sizeof") == 0)     return true;
    if(strcmp(word, "static") == 0)     return true;
    if(strcmp(word, "struct") == 0)     return true;
    if(strcmp(word, "switch") == 0)     return true;
    if(strcmp(word, "typedef") == 0)    return true;
    if(strcmp(word, "union") == 0)      return true;
    if(strcmp(word, "unsigned") == 0)   return true;
    if(strcmp(word, "void") == 0)       return true;
    if(strcmp(word, "volatile") == 0)   return true;
    if(strcmp(word, "while") == 0)      return true;
    return false;
}
 
bool LIBRARY_FUNCTION(char word[]) {
 
    if(strcmp(word, "printf") == 0)     return true;
    if(strcmp(word, "scanf") == 0)      return true;
    if(strcmp(word, "strlen") == 0)     return true;
    if(strcmp(word, "strcmp") == 0)     return true;
    if(strcmp(word, "getchar") == 0)    return true;
    if(strcmp(word, "isdigit") == 0)    return true;
    if(strcmp(word, "isalpha") == 0)    return true;
    if(strcmp(word, "isspace") == 0)    return true;
    if(strcmp(word, "sqrt") == 0)       return true;
    if(strcmp(word, "islower") == 0)    return true;
    if(strcmp(word, "isupper") == 0)    return true;
    /* You can add other functions if you want to */
    return false;
}
 
int main () {
 
    FILE *in, *out;
    char word[100], ch, c;
    long i, count, line;
    i = count = 0;
    line = 1;
    bool header, exist=false;
    char id[100][100];
    int m, k = 0;
 
    in = fopen("input.cpp", "r");
    out = fopen("token.txt", "w");
 
    fputs("Statement No.\tToken\t\t\t\t\t\tLexeme\t\t\t\t\t\tline No.\n", out);
 
    while(1) {
 
        ch = getc(in);
        if(ch == EOF) break;
 
        if(ch == '#') {
            header = false;     // header file incomlete
            word[i++] = ch;
        }
        else if(ch == '[') {
            while(1) {
                ch = getc(in);
                if(ch == ']') break;
            }
        }
        else if(ch == '(') {    // may be a function or a keyword
            word[i] = '\0';
            if(strcmp(word, "main") == 0) {
                fprintf(out, "%ld\t\t\t\tMain Function\t\t\t\t", ++count);
                fputs(word, out);
                fprintf(out, "()\t\t\t\t\t\t%ld\n", line);
                i = 0;
            }
            else if(KEYWORD(word)) {
                goto KEYWORD;
            }
            else if(LIBRARY_FUNCTION(word)) {
                fprintf(out, "%ld\t\t\t\tLibrary Function\t\t\t", ++count);
                fputs(word, out);
                fprintf(out, "\t\t\t\t\t\t%ld\n", line);
                i = 0;
            }
            else {
                fprintf(out, "%ld\t\t\t\tUser Defined Function\t\t\t\t\t", ++count);
                fputs(word, out);
                fprintf(out, "\t\t\t%ld\n", line);
                i = 0;
            }
        }
        // try with character defination
        else if(ch == 39) {
            fprintf(out, "%ld\t\t\t\tPunctuation\t\t\t\t\t%c", ++count, ch);
            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
            ch = getc(in);
            fprintf(out, "%ld\t\t\t\tCharacter\t\t\t\t\t%c", ++count, ch);
            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
            ch = getc(in);
            fprintf(out, "%ld\t\t\t\tPunctuation\t\t\t\t\t%c", ++count, ch);
            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
        }
        else if(ch == '"') {
            // rest of the input is a string until there exist another double quotation(")
            fprintf(out, "%ld\t\t\t\tPunctuation\t\t\t\t\t%c", ++count, ch);
            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
            while(1) {
                ch = getc(in);
                if(ch == '"') {
                    word[i] = '\0';
                    fprintf(out, "%ld\t\t\t\tString\t\t\t\t\t\t", ++count);
                    fputs(word, out);
                    fprintf(out, "\t\t%ld\n", line);
                    i = 0;
                    goto PUNCTUATION;
                }
                else
                    word[i++] = ch;
            }
        }
        else if(isdigit(ch)) {  // if current symbol is a numeric constant
        CONSTANT:
            // then further check if
            if(i && isalpha(word[i-1])) {
                while(1) {
                    word[i++] = ch;
                    ch = fgetc(in);
                    if(ch == ';' || ch == ',' || ch == ' ') {
                        if(ch == ' ')
                            goto station;
                        else
                            goto PUNCTUATION;
                    }
                    else
                        word[i++] = ch;
                }
            }
            else {
                word[i++] = ch;
                while(1) {
                    ch = fgetc(in);
                    if(isdigit(ch)) word[i++] = ch;
                    else break;
                }
                word[i] = '\0';
                fprintf(out, "%ld\t\t\t\tConstant\t\t\t\t\t", ++count);
                fputs(word, out);
                fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                i = 0;
                goto PUNCTUATION;
            }
        }
        // determine if the current input is a punctuation
        else if(ch == ';' || ch == ',') {
            PUNCTUATION:
            // now check if there is any element in the array
            if(i) {
                word[i] = '\0';
                if(isalpha(word[0]) || word[0] == '*') {
                    for(m=0; m<k; m++) {
                        if(strcmp(id[m],word) == 0) { // identifier already exist
                            exist = true;
                            break;
                        }
                        else exist = false;
                    }
                    if(!exist) {
                        if(word[0] == '*')
                            fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                        else
                            fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                        fputs(word, out);
                        fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                        strcpy(id[k++],word);
                        exist = true;
                        i = 0;
                    }
                    else i = 0;
                }
            }
            fprintf(out, "%ld\t\t\t\tPunctuation\t\t\t\t\t%c", ++count, ch);
            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
        }
        // determine if the current input is a operator and can't be a double operator
        else if(ch == '{' || ch == '}' || ch == '/' || ch == '%') {
                fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, ch);
                fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
        }
        else if(ch == '*') {
            if(i) {
                word[i] = '\0';
                if(isalpha(word[0])) {
                    for(m=0; m<k; m++) {
                        if(strcmp(id[m],word) == 0) { // identifier already exist
                            exist = true;
                            break;
                        }
                        else
                            exist = false;
                    }
                    if(!exist) {
                        fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                        fputs(word, out);
                        fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                        strcpy(id[k++],word);
                        exist = true;
                        i = 0;
                    }
                    else i = 0;
                }
                fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, ch);
                fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
            }
            else {
                // check if there is a pointer variable exist
                c = ch;
                ch = fgetc(in);
                if(isdigit(ch)) {
                    fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, c);
                    fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                    goto CONSTANT;
                }
                else {
                    word[i++] = c;
                    word[i++] = ch;
                }
            }
        }
        else if(ch == ' ' || ch == '\n' || ch == '\t') {
            station:
                word[i] = '\0';
 
                if(word[0] == '#' && word[i-1] == '>') {
                    fprintf(out, "%ld\t\t\t\tHeader File\t\t\t\t\t", ++count);
                    fputs(word, out);
                    fprintf(out, "\t\t\t%ld\n", line);
                    i = 0;
                }
                else if(KEYWORD(word)) {
                    KEYWORD:
                    fprintf(out, "%ld\t\t\t\tKeyword\t\t\t\t\t\t", ++count);
                    fputs(word, out);
                    fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                    i = 0;
                }
                else if(isalpha(word[0]) || word[0] == '*') {
                    for(m=0; m<k; m++) {
                        if(strcmp(id[m],word) == 0) { // identifier already exist
                            exist = true;
                            break;
                        }
                        else
                            exist = false;
                    }
                    if(!exist) {
                        if(word[0] == '*')
                            fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                        else
                            fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                        fputs(word, out);
                        fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                        strcpy(id[k++],word);
                        exist = true;
                        i = 0;
                    }
                    else i = 0;
                }
                if(ch == '\n')
                    line++;
        }
        else if(ch == '+' || ch == '-' || ch == '<' || ch == '>' || ch == '=' || ch == '!' || ch == '&' || ch == '|') {
            // possible that a double operator can exist
            c = ch;
            ch = getc(in);
            if(ch == '+' || ch == '-' || ch == '<' || ch == '>' || ch == '=' || ch == '&' || ch == '|') {
                // double operator exist and also check that if there exist any element in the array
                if(i) {
                    // so the array exist and this should be the identifier
                    word[i] = '\0';
                    if(isalpha(word[0]) || word[0] == '*') {
                        for(m=0; m<k; m++) {
                            if(strcmp(id[m],word) == 0) { // identifier already exist
                                exist = true;
                                break;
                            }
                            else
                                exist = false;
                        }
                        if(!exist) {
                            if(word[0] == '*')
                                fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                            else
                                fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                            fputs(word, out);
                            fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                            strcpy(id[k++],word);
                            exist = true;
                            i = 0;
                        }
                        else i = 0;
                    }
                }
                fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c%c", ++count, c, ch);
                fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
            }
            else {
                // single operator exist and further check if the header file is incomplete
                if(c == '>') {
                    if(header) {
                        if(i) {
                            word[i] = '\0';
                            if(isalpha(word[0]) || word[0] == '*') {
                                for(m=0; m<k; m++) {
                                    if(strcmp(id[m],word) == 0) { // identifier already exist
                                        exist = true;
                                        break;
                                    }
                                    else
                                        exist = false;
                                }
                                if(!exist) {
                                    if(word[0] == '*')
                                        fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                                    else
                                        fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                                    fputs(word, out);
                                    fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                                    strcpy(id[k++],word);
                                    exist = true;
                                    i = 0;
                                }
                                else i = 0;
                            }
                        }
                        fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, c);
                        fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                        if(ch == ' ' || ch == '\n' || ch == '\t')
                            goto station;
                        else
                            word[i++] = ch;
                    }
                    else {
                        header = true;      // header file complete
                        word[i++] = c;
                        goto station;
                    }
                }
                else if(c == '<') {
                    if(header) {
                        if(i) {
                            word[i] = '\0';
                            if(isalpha(word[0]) || word[0] == '*') {
                                for(m=0; m<k; m++) {
                                    if(strcmp(id[m],word) == 0) { // identifier already exist
                                        exist = true;
                                        break;
                                    }
                                    else
                                        exist = false;
                                }
                                if(!exist) {
                                    if(word[0] == '*')
                                        fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                                    else
                                        fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                                    fputs(word, out);
                                    fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                                    strcpy(id[k++],word);
                                    exist = true;
                                    i = 0;
                                }
                                else i = 0;
                            }
                        }
                        fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, c);
                        fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                        if(ch == ' ' || ch == '\n' || ch == '\t')
                            goto station;
                        else
                            word[i++] = ch;
                    }
                    else {
                        // the header file is incomplete. so skip anything until it is complete
                        word[i++] = c;
                        word[i++] = ch;
                    }
                }
                else {
                    // it's just a single operator and also check if there exist any element in the array
                    if(i) {
                        // so the array exist and this should be the identifier
                        word[i] = '\0';
                        if(isalpha(word[0]) || word[0] == '*') {
                            for(m=0; m<k; m++) {
                                if(strcmp(id[m],word) == 0) { // identifier already exist
                                    exist = true;
                                    break;
                                }
                                else
                                    exist = false;
                            }
                            if(!exist) {
                                if(word[0] == '*')
                                    fprintf(out, "%ld\t\t\t\tPointer variable\t\t\t", ++count);
                                else
                                    fprintf(out, "%ld\t\t\t\tIdentifier\t\t\t\t\t", ++count);
                                fputs(word, out);
                                fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                                strcpy(id[k++],word);
                                exist = true;
                                i = 0;
                            }
                            else i = 0;
                        }
                    }
                    fprintf(out, "%ld\t\t\t\tOperator\t\t\t\t\t%c", ++count, c);
                    fprintf(out, "\t\t\t\t\t\t\t%ld\n", line);
                    if(ch == ' ' || ch == '\n' || ch == '\t')
                        goto station;
                    else
                        word[i++] = ch;
                }
            }
        }
        else if(ch != ')')
            word[i++] = ch;
    }
    return 0;
}
```
