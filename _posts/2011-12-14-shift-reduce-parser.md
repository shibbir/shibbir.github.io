---
layout: post
title: "Shift Reduce Parser"
date: 2011-12-14 20:04:00 +0600
category: C/C++
excerpt: A shift-reduce parser is a class of efficient, table-driven bottom-up parsing methods for computer languages and other notations formally defined by a grammar. The parsing methods most commonly used for parsing programming languages, LR parsing and its variations, are shift-reduce methods
---

## From Wikipedia

> A shift-reduce parser is a class of efficient, table-driven bottom-up parsing methods for computer languages and other notations formally defined by a grammar. The parsing methods most commonly used for parsing programming languages, LR parsing and its variations, are shift-reduce methods. The precedence parsers used before the invention of LR parsing are also shift-reduce methods. All shift-reduce parsers have similar outward effects, in the incremental order in which they build a parse tree or call specific output actions. The outward actions of an LR parser are best understood by ignoring the arcane mathematical details of how LR parser tables are generated, and instead looking at the parser as just some generic shift-reduce method.

```cpp
#include<stdio.h>
#include<string.h>
 
FILE *out;
char stack[30][30], grammer[5][5]={"E+E", "E*E", "(E)", "id"}, line[50], input_piece[10][10];
int top = 0, k, i, index, ip = 0, count = 0, inc = 0, in, n=0;
bool bracket = false, stack_empty = false, input_empty = false, AC = false, one = false, A[50];
 
bool PARA_REDUCE (char temp[])
{
    for(k=0; k<4; k++)
        if(strcmp(temp, grammer[k]) == 0)
            return true;
    return false;
}
 
void CONCATE_REDUCE ()
{
    char temp[30];
    while(1)
    {
        if(top - inc == 1)
            one = true;
        if(one)
        {
            fprintf(out, "(%d)\t$", ++n);
            for(in=0; in<top; in++)
                if(A[in])
                    fprintf(out, "%s", stack[in]);
            fprintf(out, "\t\t\t\t\t");
            for(in=0; in<ip; in++)
                fprintf(out, " ");
            for(in=ip; in<index; in++)
                fprintf(out, "%s ", input_piece[in]);
            fprintf(out, "$\t\t");
 
            stack_empty = true;
            if(strcmp(stack[0], "E") == 0)
            {
                AC = true;
                fprintf(out, "\t\t\tAccept\n");
                break;
            }
            else
            {
                fprintf(out, "Error\n");
                break;
            }
        }
        for(i=top-1; i>=0; i--)
        {
            if((strcmp(stack[i], "+") == 0) || (strcmp(stack[i], "*") == 0))
            {
                strcpy(temp, stack[i-1]);
                strcat(temp, stack[i]);
                strcat(temp, stack[i+1]);
                 
                if(PARA_REDUCE(temp))
                {
                    fprintf(out, "(%d)\t\t$", ++n);
                    for(in=0; in<top; in++)
                        if(A[in])
                            fprintf(out, "%s ", stack[in]);
                    fprintf(out, "\t\t\t");
                    for(in=0; in<ip; in++)
                        fprintf(out, " ");
                    for(in=ip; in<index; in++)
                        fprintf(out, "%s ", input_piece[in]);
                    fprintf(out, "$\t\t");
 
                    A[i] = false;
                    A[i+1] = false;
                    inc += 2;
                     
                    fprintf(out, "\t\t\treduce by E -> %s\n", temp);
                    strcpy(stack[i-1], "E");
                }
            }
        }
    }
}
 
void REDUCE ()
{
    for(i=0; i<4; i++)
    {
        if(strcmp(stack[top-1], grammer[i]) == 0)
        {
            fprintf(out, "(%d)\t\t$", ++n);
            for(in=0; in<top; in++)
                fprintf(out, "%s ", stack[in]);
            fprintf(out, "\t\t\t");
            for(in=0; in<ip; in++)
                fprintf(out, " ");
            for(in=ip; in<index; in++)
                fprintf(out, "%s ", input_piece[in]);
            fprintf(out, "$\t\t");
            fprintf(out, "\t\treduce by E -> %s\n", stack[top-1]);
            strcpy(stack[top-1], "E");         
            break;
        }
    }
}
 
int SHIFT ()
{
    count++;
    if(count > index)
    {
        input_empty = true;
        return 0;
    }
    // before shift
    fprintf(out, "(%d)\t\t$", ++n);
    for(in=0; in<top; in++)
        fprintf(out, "%s ", stack[in]);
    fprintf(out, "\t\t\t\t");
    for(in=ip; in<index; in++)
        fprintf(out, "%s ", input_piece[in]);
    fprintf(out, "$\t\t\t\tshift\n");
     
    strcpy(stack[top++], input_piece[ip++]);
 
    REDUCE();
    return 0;
}
 
int main ()
{
    out = fopen("shift_reduce.txt", "w");
 
    for(k=0; k<50; k++)
        A[k] = true;
    fputs("=====================================================\n", out);
    fputs("\t\tSTACK\t\t\t\tINPUT\t\t\t\t\tACTION\n", out);
    fputs("-----------------------------------------------------\n", out);
 
    printf("Enter the input string: ");
    gets(line);
    index = k = 0;
 
    if(line[strlen(line)-1] == '+' || line[strlen(line)-1] == '-' || line[strlen(line)-1] == '*' || line[strlen(line)-1] == '/')
        goto exit;
 
    //  starting input separation
    for(i=0; line[i]; i++)
    {
        if(line[i] != ' ' && line[i] != '\t' && line[i] != '$')
        {
            if(line[i] == '(')
            {
                bracket = true;
                input_piece[index][k++] = line[i];
            }
            else if(line[i] == ')')
            {
                bracket = false;
                input_piece[index][k++] = line[i];
                input_piece[index][k] = '\0';
                index++;
                k = 0;
            }
            else {
                if(!bracket)
                {
                    if(line[i] == '+' || line[i] == '-' || line[i] == '*' || line[i] == '/' || line[i] == '\n')
                    {
                        input_piece[index][k] = '\0';
                        index++;
                        k = 0;
                        input_piece[index][k++] = line[i];
                    }
                    else
                    {
                        if((strcmp(input_piece[index], "+")==0) || (strcmp(input_piece[index], "*")==0) || (strcmp(input_piece[index], "-")==0))
                        {
                            input_piece[index][k] = '\0';
                            index++;
                            k = 0;
                        }
                        input_piece[index][k++] = line[i];
                    }
                }
                else
                    input_piece[index][k++] = line[i];
            }
        }
    }
    index++;
    input_piece[index][k] = '\0';
    // finish input separation
     
    while(1)
    {
        if(stack_empty)
        {
            if(input_empty)
                break;
            else
                SHIFT();
        }
        else
        {
            if(input_empty)
                CONCATE_REDUCE();
            else
                SHIFT();
        }
    }
    exit:
        if(AC)
            printf("Accept\n");
        else
            printf("Error\n");
        fclose(out);
    return 0;
}
```
