# NohaShrief - Frontend Assessment E-Commerce App

A modern, high-performance E-Commerce web application built as part of the frontend assessment, featuring advanced UI/UX enhancements, smooth animations, and optimized state management.

---

 Live Demo & Repository
* **GitHub Repository:** [https://github.com/NohaDosokii/NohaShrief-Public-frontend-assessment](https://github.com/NohaDosokii/NohaShrief-Public-frontend-assessment)
* **Live Demo:** [https://noha-shrief-public-frontend-assessm.vercel.app/](https://noha-shrief-public-frontend-assessm.vercel.app/)

---

##  Getting Started (Installation)

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/NohaDosokii/NohaShrief-Public-frontend-assessment.git](https://github.com/NohaDosokii/NohaShrief-Public-frontend-assessment.git)





Tech Stack & State Management Decision
Core Stack: React.js, Vite, Tailwind CSS, React Router, Lucide React (Icons).

State Management Choice: React Context API (ShopContext).

Why Context API? For this project scope, Context API provides a lightweight, built-in, and clean solution to share global states (Cart, Wishlist, and Theme preferences) across components without the heavy boilerplate overhead of Redux Toolkit or Zustand, keeping the bundle size optimal and performance fast.

 Implemented Features (Must + Bonus)
Core Features (Must-Haves):
Product listing with search, filtering, and category selection.

Dynamic Product Details page via React Router parameters (useParams).

Complete Shopping Cart management (quantity updates, item removal, live total calculations).

Bonus Features Implemented:
 Dark Mode: Fully integrated across all pages and components.

 Infinite Scroll: Implemented using native IntersectionObserver for smooth and dynamic product loading.


 Wishlist / Favorites: Instant add/remove functionality.

 Skeleton Loading: Professional skeleton loaders for products grid and details page to enhance perceived performance.

 Smooth Animations: Integrated Framer Motion for micro-interactions and smooth page transitions.

 Toast Notifications: User feedback alerts via react-hot-toast for cart and wishlist actions.

 Technical Decisions & Architecture
Component-Based Architecture: Modular and reusable components (ProductCard, ProductsFilterBar, ProductSkeleton) to keep the codebase clean and maintainable.

Robust ID & Asset Handling: Universal compatibility for API variations.

 Future Improvements (What's Next?)
If given more time, I would have implemented:

TypeScript for strict type safety and enhanced developer experience.

Unit Testing using Jest/Vitest and React Testing Library for core components and custom hooks.