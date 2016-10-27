---
layout: post
title: "Symbol Table Simulation"
date: 2011-01-08 20:04:00 +0600
category: C/C++
excerpt: In computer science, a symbol table is a data structure used by a language translator such as a compiler or interpreter, where each identifier in a program's source code is associated with information relating to its declaration or appearance in the source
---

## From Wikipedia

> In computer science, a symbol table is a data structure used by a language translator such as a compiler or interpreter, where each identifier in a program's source code is associated with information relating to its declaration or appearance in the source.

```cpp
#include<stdio.h>
#include<string.h>
 
int main () {
 
    FILE *out;
    out = fopen("STS_out.txt", "w");
 
    char line[50], token[100][100], pro[100][100];
    int i, k, m=0, n, start;
    bool exist = false;
 
    fprintf(out, "\t\t\t\t\t\t\t\t\t\t\t\tSymbol Table Simulator\n\n");
    again:
 
        printf("\nEnter string = (press quit to stop)\n\n");
        gets(line);
        if(strcmp(line, "quit") != 0) {
            int len = strlen(line);
            start = 0;
 
            resume:
                for(i=start; i<len; i++) {
                    if(line[i] == ' ')
                        break;
                }
 
                char temp[30];
                int p;
                for(p=0,k=start; k<i; k++, p++)
                    temp[p] = line[k];
                temp[p] = '\0';
                int ss = k;
 
                for(p=0; p<m; p++) {
                    if(strcmp(token[p], temp) == 0) {
                        exist = true;
                        printf("Properties Found for '%s'\n", temp);
                        printf("Properties: '%s'\n", pro[p]);
                        break;
                    }
                }
 
                if(!exist) {
                    for(k=start,n=0; k<i; k++, n++)
                        token[m][n] = line[k];
                    token[m][n] = '\0';
                    fprintf(out, "%s\n", token[m]);
                    printf("Properties Not Found for '%s'\nEnter properties: ", token[m]);
                    gets(pro[m]);
                    fprintf(out, "Properties => %s\n", pro[m]);
                    m++;
 
                    if(i == len)
                        goto again;
                    else {
                        start = i + 1;
                        goto resume;
                    }
                }
                else {
                    if(i == len)
                        goto again;
                    else {
                        start = ss + 1;
                        exist = false;
                        goto resume;
                    }
                }
        }
 
    return 0;
}
```
