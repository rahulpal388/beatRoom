// import {
//   createContext,
//   FC,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// // type IDimension = { left: number; top: number };

// type OpenMenuType = {
//   open: boolean;
//   position: {
//     x: number;
//     y: number;
//   };
//   item: string | null;
// };
// type IPopvoerContext = {
//   update: (event: React.MouseEvent<Element>, item: string) => void;
//   setContainerElement: (element: HTMLDivElement) => void;
// };

// const popoverContext = createContext<IPopvoerContext | null>(null);

// export const PopoverContextProvider: FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [menu, setMenu] = useState<OpenMenuType>({
//     open: false,
//     position: {
//       x: 0,
//       y: 0,
//     },
//     item: null,
//   });

//   const setContainerElement = (element: HTMLDivElement) => {
//     containerRef.current = element;
//   };

//   const update = (event: React.MouseEvent<Element>, item: string) => {
//     const rect = event.currentTarget.getBoundingClientRect();

//     setMenu((prev) => ({
//       open: prev.item === item ? !prev.open : true,
//       position: {
//         x: rect.right,
//         y: rect.bottom,
//       },
//       item,
//     }));
//   };

//   return (
//     <popoverContext.Provider
//       value={{
//         update,
//         setContainerElement,
//       }}
//     >
//       {children}
//       {menu.open && (
//         <div
//           className="z-50 p-4 bg-card shadow-lg shadow-primary  "
//           style={{
//             position: "fixed",
//             top: menu.position.y,
//             left: menu.position.x,
//           }}
//         >
//           Remove
//         </div>
//       )}
//     </popoverContext.Provider>
//   );
// };

// export const usePopoverCard = (): IPopvoerContext => {
//   const context = useContext(popoverContext);

//   if (!context) {
//     throw new Error("use option context inside the porivder");
//   } else {
//     return context;
//   }
// };
