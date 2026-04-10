import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FormCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  max-width: 600px;
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
  width: 100%;

  svg {
    position: absolute;
    left: 1rem;
    color: rgba(255, 255, 255, 0.4);
    width: 20px;
    height: 20px;
    transition: color 0.2s ease;
    pointer-events: none;
    z-index: 1;
  }

  &:focus-within svg {
    color: #818cf8;
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
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

  &[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  padding: 0.875rem 1rem 0.875rem 3rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
  min-height: 100px;
  resize: vertical;

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
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); /* Reddish accent for payment */
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
