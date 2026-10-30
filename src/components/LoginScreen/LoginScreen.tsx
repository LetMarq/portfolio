import { useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import "./LoginScreen.css";

type LoginScreenProps = {
  onLogin: () => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { t } = useI18n();
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
              placeholder={t.login.passwordPlaceholder}
              onKeyDown={(e) => e.key === "Enter" && onLogin()}
              autoFocus
            />
            <button className="login-go" onClick={onLogin} title={t.login.logIn}>
              →
            </button>
          </div>
          <p className="login-hint">{t.login.hint}</p>
        </div>
      </div>
    </div>
  );
}
