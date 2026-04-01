const InfoCard = ({ title, children }) => {
  return (
    <div className="card p-5">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default InfoCard;