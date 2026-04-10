import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Container,
  FormCard,
  Header,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  ErrorMessage,
  SubmitButton,
  FooterText,
  LinkText
} from './styles';

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Infer the TypeScript type from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginScreenProps {
  onNavigateRegister: () => void;
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigateRegister, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onSuccess();
    } catch (error: any) {
      console.error('Erro de login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Header>
          <Title>Bem-vindo de volta</Title>
          <Subtitle>Por favor, insira seus dados para continuar.</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="email">E-mail</Label>
            <InputWrapper>
              <Mail />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                $hasError={!!errors.email}
                {...register('email')}
              />
            </InputWrapper>
            {errors.email && (
              <ErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <AlertCircle /> {errors.email.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <InputWrapper>
              <Lock />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                $hasError={!!errors.password}
                {...register('password')}
              />
            </InputWrapper>
            {errors.password && (
              <ErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <AlertCircle /> {errors.password.message}
              </ErrorMessage>
            )}
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              'Entrando...'
            ) : (
              <>
                Entrar <LogIn size={20} />
              </>
            )}
          </SubmitButton>
        </Form>
        
        <FooterText>
          Ainda não tem uma conta?{' '}
          <LinkText onClick={onNavigateRegister}>
            Cadastre-se
          </LinkText>
        </FooterText>
      </FormCard>
    </Container>
  );
};
