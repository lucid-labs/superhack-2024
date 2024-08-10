import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import SkeletonLoader from "../shared/SkeletonLoader";

type Option = {
  value: string;
  label: string;
  imageURL?: string;
};

type Props = {
  onChange: (value: any) => void;
  options?: Option[];
  initialValue?: Option | null;
};

const AppSelect = ({ options = [], onChange, initialValue = null }: Props) => {
  const [isOptionChanged, setIsOptionChanged] = useState(false);
  useEffect(() => {
    setIsOptionChanged(true);
    const timeout = setTimeout(() => {
      setIsOptionChanged(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [options, setIsOptionChanged]);

  return isOptionChanged ? (
    <SkeletonLoader height="38px" />
  ) : (
    <Select
      value={initialValue ?? undefined}
      components={{
        Option: ({ children, ...rest }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <components.Option {...rest}>
              {rest.data.imageURL && (
                <Image
                  src={rest.data.imageURL}
                  alt={rest.data.label}
                  width={24}
                  height={24}
                  style={{
                    marginRight: "0.75rem",
                    verticalAlign: "middle",
                    marginTop: "-0.25rem",
                  }}
                />
              )}
              {children}
            </components.Option>
          </motion.div>
        ),
        Menu: ({ children, ...rest }) => (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <components.Menu {...rest}>{children}</components.Menu>
            </motion.div>
          </AnimatePresence>
        ),
      }}
      styles={{
        control: (baseStyle, state) => ({
          ...baseStyle,
          cursor: "pointer",
          border: "1.2px solid tintGrey",
          boxShadow: "none",
          "&:hover": {
            border: "1.2px solid #818181",
          },
        }),
        menu: (baseStyle) => ({
          ...baseStyle,
          zIndex: 10,
        }),
      }}
      onChange={(v) => onChange(v)}
      options={options}
    />
  );
};

export default AppSelect;
