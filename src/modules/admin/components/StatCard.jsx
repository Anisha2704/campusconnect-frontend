const StatCard = ({ title, value, gradient }) => {
  return (
    <div
      className="stat-card rounded-2xl text-white shadow-lg"
      style={{ background: gradient }}
    >
      <p className="stat-label text-white/80">{title}</p>
      <h2 className="stat-num text-white text-3xl">{value}</h2>
    </div>
  );
};

export default StatCard;