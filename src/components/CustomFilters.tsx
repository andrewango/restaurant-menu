import React from "react";
import { Box, chakra, useRadio } from "@chakra-ui/react";

// function Example(): JSX.Element {
//     const CustomRadio = (filter: string) => {
//         const { filter, ...radioProps } = props;
//         const {
//             state,
//             getInputProps,
//             getRadioProps,
//             htmlProps,
//             getLabelProps
//         } = useRadio(radioProps);

//         return (
//             <chakra.label {...htmlProps} cursor="pointer">
//                 <input {...getInputProps({})} hidden />
//                 <Box
//                     {...getRadioProps()}
//                     bg={state.isChecked ? "red" : "transparent"}
//                     w={12}
//                     p={1}
//                     rounded="full"
//                 >
//                     {filter}
//                 </Box>
//             </chakra.label>
//         );
//     };
// }
