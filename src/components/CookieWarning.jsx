import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CookieWarning = () => {
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  window.console.log('component is working')

  useEffect(() => {
    // Try setting a test cookie
    document.cookie = "testCookie=1; SameSite=None; Secure";
    window.console.log('testing cookie')

    // Check if the cookie was saved
    setTimeout(() => {
      if (!document.cookie.includes("testCookie")) {
        setCookiesBlocked(true);
      }
    }, 2000);
  }, []);

  if (!cookiesBlocked) return null; // Don't show alert if cookies are working

  return (
    <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 p-3 bg-warning text-dark rounded shadow-lg" style={{ zIndex: 1050, width: "90%", maxWidth: "400px" }}>
      <h5 className="fw-bold">Cookies Blocked</h5>
      <p className="mb-2">Your browser is blocking cookies. Please enable cross-site tracking for the best experience.</p>
      <ul className="mb-2 small">
        <li><strong>Chrome (Android & iOS):</strong> Settings &gt; Site Settings &gt; Cookies &gt; Allow</li>
        <li><strong>Safari (iOS):</strong> Settings &gt; Safari &gt; Prevent Cross-Site Tracking (Turn Off)</li>
        <li><strong>Firefox:</strong> Settings &gt; Privacy &gt; Enhanced Tracking Protection &gt; Standard</li>
      </ul>
      <button className="btn btn-dark btn-sm w-100" onClick={() => setCookiesBlocked(false)}>OK, Got It</button>
    </div>
  );
};

export default CookieWarning;
