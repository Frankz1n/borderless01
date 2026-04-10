import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2rem;
`;

export const FormCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: rgba(255, 255, 255, 0.4);
    width: 20px;
    height: 20px;
    transition: color 0.2s ease;
  }

  &:focus-within svg {
    color: #818cf8;
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  padding: 0.875rem 1rem 0.875rem 3rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? '#ef4444' : '#818cf8')};
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0 3px ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(129, 140, 248, 0.2)')};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const ErrorMessage = styled(motion.span)`
  color: #fca5a5;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const LinkText = styled.span`
  color: #818cf8;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #a5b4fc;
    text-decoration: underline;
  }
`;
