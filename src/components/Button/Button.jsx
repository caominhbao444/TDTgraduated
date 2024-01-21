/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.title}
    </button>
  );
};

export default Button;
