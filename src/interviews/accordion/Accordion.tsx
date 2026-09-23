import { useState } from "react";
import "./Accordion.css";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {

  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((previousId) => (
      previousId === id ? null : id
    ));
  };

  if (items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <section className="accordion">
      <h1>Accordion</h1>

      {items.map((item) => (
        <div className="accordion-item" key={item.id}>
          <h2 className="accordion-heading">
            <button
              className="accordion-trigger"
              type="button"
              aria-expanded={openId === item.id}
              onClick={() => handleToggle(item.id)}
            >
              <span>{item.title}</span>

              <span aria-hidden="true">
                {openId === item.id ? "−" : "+"}
              </span>
            </button>
          </h2>

          {openId === item.id && (
            <p className="accordion-content">{item.content}</p>
          )}
        </div>
      ))}
    </section>
  );
}
