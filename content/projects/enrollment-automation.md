---
title: University Enrollment Management System
description: "A web application that automates enrollment for the University of Havana's distance education programs, from applicant registration through entrance exams to major assignment."
category: web
skills: [Python, Django, SQLite, HTML, CSS, JavaScript]
featured: false
weight: 11
---

The University of Havana's distance education programs received over 3,000
applications a year, all processed by hand. This project replaces that manual
workflow with a web application covering the entire enrollment pipeline.

The system manages every stage of the process: applicants register and their
data is collected and validated, entrance exams are scheduled with automatic
classroom assignment, staff enter grades, and majors are distributed among
applicants based on their exam results. Administrators also get reports on
the whole process.

Built with Django following its model-view-template architecture, with the
relational schema designed from the ground up as the core of the project:
modeling applicants, exams, classrooms, courses, and their relationships so
the workflows above fall naturally out of the data design.

Developed as a database course project at the University of Havana, aimed at
a real administrative problem faced by the university.