---
layout: post
title: "Beginning IndexedDB with IDBWrapper"
date: 2013-08-04 20:04:00 +0600
category: html5
excerpt: In this article we will see how we can use indexeddb which is a browser based database with a library called IDBWrapper to ease the use of indexedDB and abstract away the differences between the existing implementations in Chrome, Firefox and IE10
---

## Introduction

In this article we will see how we can use **IndexedDB** which is a browser based database with a library called **IDBWrapper** to ease the use of indexedDB and abstract away the differences between the existing implementations in Chrome, Firefox and IE10.

## What's an IndexedDB

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (Mozilla Developer Network)

> IndexedDB is an API for client-side storage of significant amounts of structured data and for high performance searches on this data using indexes.

Basically, its a set of "object stores". An [object store](http://www.w3.org/TR/IndexedDB/#object-store-concept) is just a mechanism for storing data in a database. The stores are like a table in SQL database. You can have as many databases as you like, and as many stores(or tables) within each database. Unlike the [LocalStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage), which is based on named key/value pairs, IndexedDB supports the storage of structured data.

The biggest advantages of IndexedDB is that its provides good search performance, since data can be indexed according to search keys.

## What's IDBWrapper

The API that IndexedDB provides are quite complex. To overcome this complexity, [IDBWrapper](https://jensarps.github.io/IDBWrapper/), which is an excellent library, provides a wrapper for IndexedDB which is easier to use. According to the library:

> IDBWrapper is a cross-browser wrapper for the HTML5 IndexedDB API. While this API is the future of offline storage, it is not very intuitive to use. IDBWrapper is there to provide easy access to IndexedDB's features.

## How to use IDBWrapper

Let's build a small todo application using IDBWrapper. First create a html file. we’ll call it **todo.html**

```html
<!DOCTYPE html>
<head>
    <meta charset=utf-8 />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
 
    <title>Simple Todo List using IDBWrappper</title>
 
    <style>
        body { margin-top: 50px; }
        th { text-align: left; padding: 8px 8px 8px 0; }
        td { border-top: 1px solid #DDDDDD; padding: 8px 8px 8px 0; }
        #container { margin: auto; width: 900px; }
    </style>
</head>
<body>
    <div id="container">
        <form>
            <input type="text" id="title" placeholder="Enter Title" />
            <input type="text" id="description" placeholder="Enter Description" />
            <input type="button" id="saveTodo" value="Add Todo" />
        </form>
        <hr />
        <h3>Your todo list</h3>
        <div id="todos"></div>
    </div>
    <script src="idbstore.min.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

we have two input fields for the title and description of a todo. We have a button that's going to save that todo into our IndexedDB database. Then we added two scripts file before the closing body tag. **idbstore.min.js** file is the IDBWrapper library. And we also include a main.js file which we'll be create next.

#### Create a script file **main.js**:

```javascript
var todos = new IDBStore({
    storeName: "todos",
    onStoreReady: refreshTodo
});
```
that will create a store object (table) named **todos**.

```text
storeName = name of the table. in our case its "todos"
onStoreReady = when the store object is ready, it will trigger the refreshTodo() callback
```

Next, create the `refreshTodo()` function:

```javascript
function refreshTodo () {
    todos.getAll(todoList);
}
```

`getAll` method is provided by IDBWrapper, which will try to fetch all the data inside the todos table. Now if `getAll` operation was successful, it will receive an array of all objects and pass them to the `todoList()` callback:

```javascript
function todoList(data) {
    if(data.length) {
        var table = ["<table><tr><th>Title</th><th>Description</th><th>Action</th></tr>"],
            k = 1;
        data.forEach(function (key) {
            table[k++] = '<tr><td>';
            table[k++] = key.title;
            table[k++] = '</td><td>';
            table[k++] = key.description;
            table[k++] = '</td><td>';
            table[k++] = "<input type='button' value='Done' onclick='deleteTodo(" + key.id + ")' />";
            table[k++] = '</td></tr>';
        });
        table[k++] = '</table>';
 
        document.getElementById("todos").innerHTML = table.join('');
    }
    else {
        document.getElementById("todos").innerHTML = "Congratulation! You have done all the tasks.";
    }
}
```

So, finally `todoList()` receives all the todos data and just displaying them on the page. Obviously, when the application first run there will be no data to display.

So now, we need to write some code for adding a todo. First attach a click event handler to the saveTodo button:

```javascript
document.getElementById("saveTodo").addEventListener("click", addTodo);
```

Now create the `addTodo()` function:

```javascript
function addTodo () {
    var titleField = document.getElementById("title"),
        descriptionField = document.getElementById("description");
 
    var data = {
        title: titleField.value,
        description: descriptionField.value
    };
 
    if(data.title === "" || data.description === "") {
        alert("Please enter valid data!");
    } else {
        todos.put(data, function() {
            titleField.value = "";
            descriptionField.value = "";
            refreshTodo();
        });
    }
}
```

Here we just collect the title and description from the input fields and uses the IDBWrapper's `put()` method to save that todo into our todos table. And then after saving the data we called the `refreshTodo()` function that will redraw all the todos into our page. Pretty simple.

Now, you'll noticed that we also put a button inside each row in our html table. that will call `deleteTodo()` function and we also passed an id to that function. Now, you'll be wondering where that id is came from. After all We didn’t specify anything like id. We only have title and description. So, here is the thing, when we create a todo object and store them in our todos table, the database will automatically add a unique key named "id". So, that’s where the id came from. However, we can tell the IDBWrapper to use our own custom field to use as an unique key by defining a **keyPath** property. See the [docs](https://github.com/jensarps/IDBWrapper) for more details.

Finally, we need to create a `eleteTodo()` function:

```javascript
function deleteTodo (id) {
    todos.remove(id, refreshTodo);
}
```

Here, we receive the id and uses the remove method to remove that particular todo from the database. Then again called the `refreshTodo()` callback.

And that's all. We just created our very first application using IndexedDB.

I have also made an simple contact manager application using IndexedDB, which you can download from [here](https://shibbir.io/simple-contact-manager/).
