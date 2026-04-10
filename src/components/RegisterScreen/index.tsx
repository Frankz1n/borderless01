import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Lock, AlertCircle, UserPlus } from 'lucide-react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

interface RegisterScreenProps {
  onNavigateLogin: () => void;
  onSuccess: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateLogin, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      onSuccess();
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao criar conta: ' + error.message);
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
          <Title>Criar Conta</Title>
          <Subtitle>Preencha os dados abaixo para se cadastrar.</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="name">Nome completo</Label>
            <InputWrapper>
              <User />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                $hasError={!!errors.name}
                {...register('name')}
              />
            </InputWrapper>
            {errors.name && (
              <ErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <AlertCircle /> {errors.name.message}
              </ErrorMessage>
            )}
          </InputGroup>

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

          <InputGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <InputWrapper>
              <Lock />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                $hasError={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <AlertCircle /> {errors.confirmPassword.message}
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
              'Cadastrando...'
            ) : (
              <>
                Cadastrar <UserPlus size={20} />
              </>
            )}
          </SubmitButton>
        </Form>
        
        <FooterText>
          Já tem uma conta?{' '}
          <LinkText onClick={onNavigateLogin}>
            Faça login
          </LinkText>
        </FooterText>
      </FormCard>
    </Container>
  );
};
