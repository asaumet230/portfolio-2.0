import { GoogleReCaptchaProvider, useGoogleReCaptcha } from '@google-recaptcha/react';
import { useCallback, useEffect } from 'react';

const App = () => {
  const { executeV3 } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeV3) {
      console.log('Execute recaptcha not available');
      return;
    }

  }, [executeV3]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return <button onClick={handleReCaptchaVerify}>verify</button>;
};

