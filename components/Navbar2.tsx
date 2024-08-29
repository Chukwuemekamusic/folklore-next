// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function Navbar() {
//     const { data: session } = useSession();
//     const userName = session?.user?.name || '';
  
//     // Placeholder for categories and continents
//     const categories = []; // Define your categories here
//     const continents = []; // Define your continents here
  
//     return (
//       <header>
//         {/* Navigation */}
//         <nav className="navbar bg-light navbar-light navbar-expand-lg">
//           ...
//           <ul className="navbar-nav">
//             ...
//             <li className="nav-item dropdown">
//               <Link className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
//                 Explore
//               </Link>
//               <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
//                 <li className="dropdown dropend">
//                   <Link className="dropdown-item dropdown-toggle" href="#" id="multilevelDropdownMenu1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     By Category
//                   </Link>
//                   <ul className="dropdown-menu" aria-labelledby="multilevelDropdownMenu1">
//                     {/* Map through categories */}
//                     {categories.map(category => (
//                       <li key={category.legend_id}>
//                         <Link className="dropdown-item" href={`/legend_stories?category_id=${category.legend_id}`}>{category.name}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//                 <li className="dropdown dropend">
//                   <Link className="dropdown-item dropdown-toggle" href="#" id="multilevelDropdownMenu1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     By Continent
//                   </Link>
//                 <ul className="dropdown-menu" aria-labelledby="multilevelDropdownMenu1">
//                   {/* Map through continents */}
//                   {continents.map(continent => (
//                     <li key={continent.continent_id}>
//                       <Link className="dropdown-item" href={`/legend_stories?continent_id=${continent.continent_id}`}>{continent.name}</Link>
//                     </li>
//                   ))}
//                 </ul>
//                 </li>
//                 ...
//               </ul>
//             </li>
//             ...
//           </ul>
//           ...
//         </nav>
//         {/* End Navigation */}
//       </header>
//     );
//   }