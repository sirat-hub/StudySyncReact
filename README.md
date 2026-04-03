<div align="center">
  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=studysync" alt="StudySync Logo" width="100" />
  <h1>StudySync</h1>
  <p><strong>Assignment 02: Dynamic Web Application using JavaScript, DOM, CRUD & Advanced Methods</strong></p>
</div>

## 🌐 Links
- **Live Demo (Vercel):** [INSERT DEPLOYMENT LINK HERE]
- **GitHub Repository:** [INSERT GITHUB LINK HERE]

---

## 📖 Brief Project Overview
StudySync is a highly aesthetic, interactive web application designed to connect university students looking for study partners. This project implements a fully functional **Object & Array-based CRUD system**, features **advanced Array algorithms**, performs extensive **String parsing methods**, and contains a modular, persistent **Dark/Light Theme mode** managed via User's LocalStorage.

It satisfies all assignment requirements by translating vanilla DOM concepts into modern JS architecture (ES6 + Components).

---

## ✨ Key Features
1. **Multi-Page Routing:** 6 Pages minimum (Home, About Us, Contact Us, Groups CRUD, Sign In, Sign Up, Dashboard). 
2. **Robust Array of Objects CRUD:** Create, Read, Update, and Delete Study Groups directly mutating Application State containing JavaScript Array of Objects (`db.js`). Form submissions append objects (`[...array]`).
3. **Advanced Array Methods:** We utilize 5+ filters including: 
   - `Array.filter()` (search by topic/string/category/price)
   - `Array.map()` (dynamic DOM injection mapping to Grid Cards)
   - `Array.sort()` (sorting grid elements by highest/lowest price or newest Date)
   - `Array.reduce()` (accumulating total count of free groups)
   - `Array.every()` & `Array.some()` & `Array.find()` (analytics bar identifying specific elements)
   - `Array.includes()` 
4. **Extensive String Manipulation (10+ Methods):**
   Our `Groups.jsx` system deeply cleanses data strings utilizing 10 native JS properties including `.toUpperCase()`, `.toLowerCase()`, `.trim()`, `.includes()`, `.substring()`, `.replace()`, `.split()`, `concat()`, `.startsWith()`, and `.endsWith()`.
5. **Theme Toggle Persistence:** Located inside the `Navbar` across all pages. Toggles `.glass-panel` UI into Light Theme (`var(--bg-primary)`) and persists the chosen string value in `localStorage.setItem('studysync_theme_preference')`.

---

## 💻 Technologies Used
- **JavaScript (ES6):** Complete functional logic, Object destructuring, Map/Reduce algorithms, LocalStorage parsing, and Arrow Functions.
- **React (Vite):** Utilized as the ultimate DOM manipulation layer replacing raw vanilla JS `document.createElement`.
- **Tailwind CSS v4:** Modern Utility CSS for Glassmorphism & Responsive Grids.
- **Framer Motion:** High-fidelity Gen-Z CSS Animations.

---

## 📁 Project Structure

```text
studysync/
├── index.html
├── src/
│   ├── database/
│   │   └── db.js                  // Array of Objects Data Initialization
│   ├── constants/
│   │   └── themeConstants.js      // Theme strings dictionary
│   ├── utils/
│   │   └── themeUtils.js          // LocalStorage toggle logic (Modular JS)
│   ├── components/
│   │   └── Navbar.jsx             // Consistent across pages (Theme Button)
│   └── pages/
│       ├── Groups/
│       │   └── Groups.jsx         // All CRUD logic + String Methods + Filter Algorithms
│       ├── Home/
│       ├── About/
│       ├── Contact/
│       └── Auth/
```

---

## 🚀 How to Compile & Run
1. Ensure Node.js is installed.
2. In the project root, run:
   ```bash
   npm install
   npm run dev
   ```
3. The Terminal will output `localhost:5173`. Open it inside Google Chrome.
4. **To view the CRUD operations:** Navigate to the "**Groups (CRUD)**" link in the Navbar to test Creating, Editing, Searching, and deleting elements utilizing native Array logic. 

---

## 📷 Screenshots
*(Replace the below links with your physical file screenshots before submission! Task: "Screenshots of each web page + VS Code file structure")*

- **VS Code Structure:** `[Insert Screenshot]`
- **Home Page:** `[Insert Screenshot]`
- **About Us Page:** `[Insert Screenshot]`
- **Groups / CRUD App Page:** `[Insert Screenshot]`
- **Sign In / Sign Up:** `[Insert Screenshot]`
- **Contact Us:** `[Insert Screenshot]`
