import { useState } from "react";
import "./LoginScreen.css";
import type { Language } from "../../types/types";

type LoginScreenProps = {
  language: Language;
  onLogin: () => void;
};

export function LoginScreen({ language, onLogin }: LoginScreenProps) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="login-screen">
      <div className="login-box">
        {imgOk ? (
          <img
            className="login-avatar"
            src="/duck.jpg"
            alt="adm"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="login-avatar login-avatar-fallback">🦆</div>
        )}

        <div className="login-info">
          <p className="login-nick">adm</p>
          <div className="login-row">
            <input
              className="login-password"
              type="password"
              placeholder={language === "pt" ? "Senha" : "Password"}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              autoFocus
            />
            <button
              className="login-go"
              onClick={onLogin}
              title={language === "pt" ? "Entrar" : "Log in"}
            >
              →
            </button>
          </div>
          <p className="login-hint">
            {language === "pt"
              ? "Digite qualquer senha e pressione →"
              : "Type any password and press →"}
          </p>
        </div>
      </div>
    </div>
  );
}
