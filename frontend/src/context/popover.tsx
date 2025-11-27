import {
  createContext,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type IDimension = { left: number; top: number };

type IPopvoerContext = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  popoverRef: React.RefObject<SVGSVGElement | null>;
  updateDimension: () => void;
  dimension: IDimension;
  setDimension: React.Dispatch<SetStateAction<IDimension>>;

  cardType: string | null;
  openPopover: boolean;
  setCardType: React.Dispatch<SetStateAction<string | null>>;
  setOpenPopover: React.Dispatch<SetStateAction<boolean>>;
};

const popoverContext = createContext<IPopvoerContext | null>(null);

export const PopoverContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cardType, setCardType] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [dimension, setDimension] = useState<IDimension>({ left: 0, top: 0 });
  const popoverRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateDimension = () => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      setDimension({ top: rect.bottom, left: rect.left });
    }
  };

  useEffect(() => {
    updateDimension();
  }, [popoverRef, openPopover]);
  return (
    <popoverContext.Provider
      value={{
        containerRef,
        dimension,
        setDimension,
        updateDimension,
        openPopover,
        setOpenPopover,
        popoverRef,
        cardType,
        setCardType,
      }}
    >
      {children}
    </popoverContext.Provider>
  );
};

export const usePopoverCard = (): IPopvoerContext => {
  const context = useContext(popoverContext);

  if (!context) {
    throw new Error("use option context inside the porivder");
  } else {
    return context;
  }
};
