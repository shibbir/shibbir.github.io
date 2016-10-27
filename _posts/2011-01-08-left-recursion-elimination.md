---
layout: post
title: "Left Recursion Elimination"
date: 2011-01-08 20:04:00 +0600
category: C/C++
excerpt: In the formal language theory of computer science, left recursion is a special case of recursion where a string is recognized as part of a language by the fact that it decomposes into a string from that same language (on the left) and a suffix (on the right). For instance, 1+2+3 can be recognized as a sum because it can be broken into 1+2, also a sum, and +3, a suitable suffix
---

## From Wikipedia

> In the formal language theory of computer science, left recursion is a special case of recursion where a string is recognized as part of a language by the fact that it decomposes into a string from that same language (on the left) and a suffix (on the right). For instance, 1+2+3 can be recognized as a sum because it can be broken into 1+2, also a sum, and +3, a suitable suffix.

```cpp
#include<stdio.h>
#include<string.h>
#include<ctype.h>
 
/*
    Input: expr = expr + term | expr - term | term
    Output:
    expr =  term expr'
    expr' = +term expr' | -term expr' | E
*/
 
int main () {
 
    char line[100], word[20][20], terminal[20], *loc;
    int i, k, start, index;
    gets(line);
    printf("Input: ");
    puts(line);
    printf("Output:n");
 
    k = index = 0;
    for(i=0; line[i]; i++) {
        if(line[i] == '=') {
            terminal[k] = '\0';
            break;
        }
        else if(!isspace(line[i]))
            terminal[k++] = line[i];
    }
    k = 0;
    start = i + 1;
 
    for(i=start; line[i]; i++) {
        if(line[i] == '|') {
            word[index][k] = '\0';
            index++;
            k = 0;
        }
        else if(!isspace(line[i]))
            word[index][k++] = line[i];
    }
    word[index++][k] = '\0';
 
    printf("%s = ", terminal);
    start = 0;
    for(i=0; i<index; i++) {
        loc = strstr(word[i], terminal);
        if(loc == NULL) {
            if(start)
                printf(" |");
            printf(" %s %s'", word[i], terminal);
            start = 1;
        }
    }
 
    printf("n%s' = ", terminal);
    for(i=0; i<index; i++) {
        loc = strstr(word[i], terminal);
        if(loc != NULL) {
            for(k=0; word[i][k]; k++) {
                if(k == loc-word[i]) {
                    k = strlen(terminal)-1;
                }
                else
                    printf("%c", word[i][k]);
            }
            printf(" %s' | ", terminal);
        }
    }
    printf("E\n");
    return 0;
}
```
