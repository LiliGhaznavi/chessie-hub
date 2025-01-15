import "../styles/Logo.scss";

export default function Logo() {
  return (
    <div className="logo-container">
      <img
        className="logo-img"
        src="/images/logo.webp"
        alt="Two chess pieces"
      />
      <h1 className="logo-title">ChessiHub</h1>
    </div>
  );
}
