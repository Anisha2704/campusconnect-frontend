const ActionButton = ({ text, gradient }) => {
  return (
    <button
      className="btn text-white px-6 py-3 rounded-xl font-semibold"
      style={{ background: gradient }}
    >
      {text} →
    </button>
  );
};

export default ActionButton;