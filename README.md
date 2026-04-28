<h1 align="center">🌾 AgriLink</h1>

<p align="center">
A digital platform that connects farmers and buyers directly, ensuring fair trade, transparency, and efficiency in agricultural markets.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Domain-Agriculture-green?style=for-the-badge">
</p>

---

## 🌍 Problem Statement

The traditional agricultural supply chain involves multiple intermediaries, which leads to inefficiencies such as:

- Farmers receiving lower profits due to middlemen commissions  
- Buyers paying higher prices without transparency  
- Lack of direct communication between producers and consumers  
- Limited digital adoption in rural agricultural markets  

These challenges reduce trust and efficiency in the system.

---

## 💡 Proposed Solution

AgriLink is designed as a **direct farmer-to-buyer marketplace** that eliminates unnecessary intermediaries.

The platform allows:
- Farmers to list and manage their products  
- Buyers to explore and purchase directly  
- Transparent pricing with discount logic  
- Simple and intuitive user interaction  

---

## 🎯 Objectives

- Enable direct trade between farmers and buyers  
- Improve price transparency  
- Provide a simple digital solution for agriculture  
- Reduce dependency on middlemen  
- Build a scalable base for future agri-tech solutions  

---

## 🚀 Features

### 👨‍🌾 Farmer Module
- Product listing with quantity and price  
- Inventory management  
- Order tracking dashboard  
- Profile management (farm details)  

### 🛒 Buyer Module
- Browse available products  
- Search by name or location  
- View pricing and stock availability  
- Purchase products with discount  
- Cancel placed orders  

### ⚙️ System Features
- Real-time updates without page reload  
- Automatic discount calculation  
- Order status tracking  
- Dynamic UI rendering  
- Clean and responsive layout  

---

## 🔄 System Workflow

1. User selects role (Farmer / Buyer)  
2. User logs into the platform  
3. Farmer adds products to inventory  
4. Buyer browses marketplace  
5. Buyer selects item and enters quantity  
6. System calculates total cost and discount  
7. Order is placed  
8. Inventory updates dynamically  
9. Order appears in both dashboards  

---

## 🧠 Internal Logic Overview

- Inventory stored in JavaScript arrays  
- Orders tracked with unique IDs  
- Discount applied using fixed platform percentage  
- Stock automatically updated after purchase  
- Cancelled orders restore stock  
- DOM manipulation used for UI updates  

---

## 🏗️ System Architecture

Frontend-based architecture:

- Presentation Layer → HTML (UI structure)  
- Styling Layer → CSS (layout and responsiveness)  
- Logic Layer → JavaScript (data handling and interactions)  

No backend is used currently. All data is handled in-memory.

---

## 🔍 Data Flow

- User Input → Forms (HTML)  
- Processing → JavaScript functions  
- Storage → In-memory arrays (inventory, orders)  
- Output → Dynamic UI rendering  

---

## 🎨 UI/UX Design Approach

- Minimal and clean interface  
- Card-based layout for readability  
- Responsive grid system  
- Clear separation of roles (Farmer / Buyer)  
- Focus on usability and simplicity  

---
---

## 📸 Screenshots

### 🏠 Home Page
<p align="center">
  <img src="assets/screenshots/homepage.png" width="80%" alt="Home Page">
</p>

### 👨‍🌾 Farmer Dashboard
<p align="center">
  <img src="assets/screenshots/farmer-dashboard.png" width="80%" alt="Farmer Dashboard">
</p>

### 🛒 Buyer Dashboard
<p align="center">
  <img src="assets/screenshots/buyer-dashboard.png" width="80%" alt="Buyer Dashboard">
</p>

---
## 🛠️ Tech Stack

- HTML → Structure  
- CSS → Styling and responsiveness  
- JavaScript → Logic and interactivity  

---

## 📂 Project Structure
```
AgriLink/
│
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # JavaScript logic
│
├── assets/             # All static files
│   ├── images/         # UI images (icons, illustrations)
│   │   ├── farmer.png
│   │   ├── buyer.png
│   │   └── banner.png
│   │
│   ├── screenshots/    # Project screenshots for README
│   │   ├── homepage.png
│   │   ├── farmer-dashboard.png
│   │   └── buyer-dashboard.png
│
└── README.md           # Documentation
```
---

## ⚡ Installation & Usage

1. Clone the repository  
   git clone https://github.com/tarakram2006/agrilink.git  

2. Navigate to the project folder  

3. Open index.html in browser  

No additional setup required.

---

## 📈 Future Enhancements

- Backend integration (Node.js / Firebase)  
- Database for persistent storage  
- Authentication system  
- Payment gateway integration  
- Delivery tracking system  
- Mobile application development  
- Multi-language support  
- AI-based price prediction  

---

## ⚠️ Limitations

- No backend (data resets on refresh)  
- No real authentication system  
- No persistent storage  
- No real payment integration  
- Limited scalability in current version  

---

## 🌟 Learning Outcomes

- Hands-on experience with DOM manipulation  
- Understanding of frontend architecture  
- Improved problem-solving skills  
- Experience building real-world applications  
- Better UI/UX design practices  

---

## 🌱 Real-World Impact

This project demonstrates how technology can:

- Empower farmers with direct market access  
- Improve transparency in pricing  
- Simplify agricultural trade  
- Encourage digital adoption in rural sectors  

---

## 🤝 Contribution

Contributions are welcome:

1. Fork the repository  
2. Create a new branch  
3. Make improvements  
4. Submit a pull request  

---

## 📜 License

This project is open-source and available for educational purposes.

---

## 👨‍💻 Author

- Tarak
- Student 
- Sasi Institute of Technology & Engineering  

---

<p align="center">
🌾 Building solutions that matter
</p>
