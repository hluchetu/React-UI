// import { ProductPagination } from "./interviews/pagination/ProductPagination";
import { Accordion } from "./interviews/accordion/Accordion";
import { accordionItems } from "./interviews/accordion/data";

export default function App() {
  // return <ProductPagination />;
  return <Accordion items={accordionItems} />;
}
