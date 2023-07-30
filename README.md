# Billing - BAMA - Project Description:

Our project is based on billing, associated with a company named BAMA. Its objective is to allow the registration and control of the company's billing. The project enables the creation of invoices related to their corresponding orders and delivery notes (albaranes). Additionally, it facilitates the management of invoices, providing information about due dates, outstanding invoices, and the total billed per month.

# Project Functions

# Create Customer
Allows registering new customers with the following data:

Customer name
Social address
CIF (Tax Identification Code)
Payment method: Transfer, Confirming, or Bank Transfer
Option to activate or deactivate previously created customers.

# Create Order
Allows registering orders received from customers with the following data:

Order number
Order date
Customer associated with the order
Order amount
Possibility to attach a file (PDF) related to the order.

# Create Delivery Note (Albaran)
Allows registering delivery notes generated when delivering the requested service/product from the order. The required data are:

Delivery note number (automatically generated as a consecutive number)
Customer associated with the delivery note
Delivery note date
Delivery note amount
Order associated with the delivery note
Possibility to attach a file (PDF or Word) of the delivery note
Possibility to attach a file (PDF) of the delivery note signed by the customer.

# Create Invoice
Allows generating invoices with the following data:

Invoice number (automatically generated as a consecutive number)
Customer associated with the invoice
Invoice date
Due date (options: Immediate payment, 30 days from invoice date, or 60 days from invoice date)
Base amount (amount WITHOUT VAT)
VAT rate (options: 21%, 10%, 4%, or No VAT)
VAT amount (automatically calculated based on the base amount and VAT rate)
Total invoice amount (sum of the base amount and VAT amount)
Invoice status (In process or closed)
Payment date (manually entered when payment is received)
Order associated with the invoice
Delivery note associated with the invoice (optional, as there might not always be an associated delivery note)
Possibility to attach a file (Word or PDF) of the invoice.

# Invoice List
The project provides a list of invoices with the following fields:

Invoice number
Invoice date
Customer associated with the invoice
Due date
Payment date
Invoice status
Base amount
VAT percentage
VAT amount
Total invoice amount
Associated order number
Associated delivery note number
The list allows searching and sorting by various fields, such as invoice date, customer, invoice number, amount, order, invoice status, and payment date.

# Delivery Note List
The project offers a list of delivery notes with the following fields:

Delivery note number
Delivery note date
Customer associated with the delivery note
Customer CIF
Delivery note status (signed or not signed)
Delivery note amount
Invoiced or not invoiced
Order associated with the delivery note
Invoice associated with the delivery note (if exists)
The list allows searching and sorting by various fields, such as delivery note date, customer, delivery note number, amount, order, delivery note status, and invoiced or not.

# Order List
The project displays a list of orders with the following fields:

Order number
Order date
Customer associated with the order
Customer CIF
Order amount
Percentage invoiced (percentage of the invoiced amount)
Order status (open or closed)
Invoices corresponding to this order and their amounts
Delivery notes corresponding to this order
The list allows searching and sorting by various fields, such as order date, customer, amount, and order status.

## Conclusions
The BAMA billing project provides a set of functions to register and control the billing of a company. It allows managing customers, orders, delivery notes, and invoices, and provides lists with relevant information for financial control. With this tool, a detailed record of all billing transactions can be maintained, and tracking due dates and outstanding payments can be facilitated.

## Login Page with Token
The login page provides a secure mechanism for authenticated users to access the billing system. It uses a token-based authentication system to protect user credentials and ensure that only authorized individuals can access the program's functions.

Furthermore, the BAMA billing project ensures the security and protection of data and system functions, providing users with a safe and reliable experience while working with the application.

## Home Page
The "Home" page serves as the control center of the BAMA billing application, providing links and quick access to all main sections of the application, including Customers, Orders, Delivery Notes, and Invoices.

With the implementation of the "Home" page, the BAMA billing application provides an intuitive and comprehensive interface for users to efficiently access and manage all important functionalities of the system.

## TABLE OF CONTENTS

Installation
Mockup
Technologies
Tools
Developers

# Installation:
To install the project, you must clone the repository with the following link: https://github.com/Sebasbh/BamaProyect.git

# Technologies
React, React-Bootstraps and for database MongoDB

# Tools
Trello, Figma, Visual studio code, Git & Github

# Developers

Monica
Sebastian
Lucia
Jatna
Nuria
