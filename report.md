# Mini project M1B - TDW (TODO App)

## Overview

The main goal of this project is to study CI/CD pipelines and the importance of them in the development process. The project consists in a simple todo list application that store the todos inside a database which will be further explained in the next sections.
Furthermore, there is a news page that fetches data from a CMS API and displays the news in a list.

## Features

- [x] **View Todos**: A page to view all the todos.
- [x] **Add Todo**: A form to add a new todo.
- [x] **Delete Todo**: A button to delete a todo.
- [x] **Mark Todo as Done**: A button to mark a todo as done.
- [x] **View News**: A page to view the news.

## Tech Stack

This project was thought to use different technologies from the ones used in class. The tech stack is as follows:

![Tech Stack](assets/mei-tdw-m1-architecture.png)
### SvelteKit

[SvelteKit](https://kit.svelte.dev/) is a framework for building web applications with Svelte. It is a powerful tool that allows developers to create applications with ease and speed. SvelteKit provides a great developer experience and is highly performant.
The SvelteKit can work as frontend and backend, due to the server-side rendering feature. All the business logic of the TODO app is possible with SvelteKit while the News is fetched from a CMS API which will be explained in the next sections.

### DrizzleORM

[DrizzleORM](https://orm.drizzle.team/) is an Object-Relational Mapping (ORM) library which provides a simples way to interact with databases. The interaction with the Todo database is done through DrizzleORM simplifying the process of creating, reading, updating and deleting data through migrations and models.

### Turso

[Turso](https://turso.tech/) is a distributed, edge-hosted SQL database designed to provide low-latency data access by running closer to end-users geographically. Turso builds upon libSQL, an open-source and cloud-native fork of SQLite, to offer a developer-friendly and scalable database solution for modern applications.
For this project, Turso is used to store the todos created by the user.

### PocketBase
[PocketBase](https://pocketbase.io/) is an open-source backend framework designed to simplify and accelerate the development of modern applications. Written in the Go programming language, PocketBase provides a self-contained, portable backend solution that includes a real-time database, user authentication and authorization, file storage, and an admin dashboard—all accessible through a RESTful API.
In this project PocketBase is used to fetch the news from the collection using the PocketBase toolkit while hosted in [pockethost.io](https://pockethost.io).


# CI/CD Tools

A side goal of the project was to study different tools from the ones learned in class. Thus, the project uses the following tools apart from the ones listed above:

## Vitest

Instead of using Jest, the project uses [Vitest](https://vitest.dev/). Sveltekit uses Vite as a bundler and Vitest is a testing framework that is built on top of Vite. It is a fast and lightweight testing framework that provides a great developer experience being faster and using less resources than Jest. A main difference is that Vitest runs the tests in the browser, which allows the developer to debug the tests in the browser through an UI.
![VitestUI](assets/vitest-ui.png)

## JSDoc

SvelteKit developer team prefers the usage of JSDoc over TypeScript for documenting the code and providing type checking because of its simplicity and ease of use. JSDoc is a markup language used to annotate JavaScript source code files.
The JSDoc works by adding comments to the code that will be parsed by type checking tools. During the development of this project JSDocs brought some problems more specifically with the DrizzleORM library, which is still in beta and has some issues with the JSDoc type checking.
![JSDoc](assets/jsdoc.png)