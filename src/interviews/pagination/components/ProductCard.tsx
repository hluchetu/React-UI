type ProductCardProps = {
  title: string;
  thumbnail: string;
};

export function ProductCard({ title, thumbnail }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={thumbnail} alt={title} loading="lazy" width="180" height="180" />
      <h2>{title}</h2>
    </article>
  );
}
