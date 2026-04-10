import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Landmark, ArrowRight, AlertCircle, DollarSign, ListOrdered } from 'lucide-react';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  FormCard,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  Select,
  ErrorMessage,
  SubmitButton
} from './styles';

// Keep all fields as strings for react-hook-form compatibility
const accountSchema = z.object({
  name: z.string().min(2, 'O nome da instituição deve ter pelo menos 2 caracteres'),
  type: z.string().min(1, 'Selecione um tipo de conta válido'),
  balance: z.string(),
});

type AccountFormInputs = {
  name: string;
  type: string;
  balance: string;
};

export const AccountRegistrationScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AccountFormInputs>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      type: '',
      balance: '0'
    }
  });

  const onSubmit = async (data: AccountFormInputs) => {
    try {
      if (!auth.currentUser) {
        alert('Você precisa estar logado para criar uma conta.');
        return;
      }

      // Convert to number manually after validation
      const balance = Number(data.balance.replace(',', '.')) || 0;

      await addDoc(collection(db, 'accounts'), {
        userId: auth.currentUser.uid,
        name: data.name,
        type: data.type,
        balance,
        createdAt: new Date().toISOString()
      });

      alert('Conta registrada com sucesso!');
      reset();
    } catch (error: any) {
      console.error('Erro ao registrar conta:', error);
      alert('Erro ao registrar a conta: ' + error.message);
    }
  };

  return (
    <FormCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Nome da Instituição */}
        <InputGroup>
          <Label htmlFor="name">Instituição / Banco</Label>
          <InputWrapper>
            <Landmark />
            <Input
              id="name"
              type="text"
              placeholder="Ex: Nubank, Itaú..."
              $hasError={!!errors.name}
              {...register('name')}
            />
          </InputWrapper>
          {errors.name && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.name.message}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Tipo de Conta */}
        <InputGroup>
          <Label htmlFor="type">Tipo de Conta</Label>
          <InputWrapper>
            <ListOrdered />
            <Select id="type" $hasError={!!errors.type} {...register('type')}>
              <option value="" disabled>Selecione o tipo de conta...</option>
              <option value="Conta Corrente">Conta Corrente</option>
              <option value="Conta Poupança">Conta Poupança</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Dinheiro Físico">Dinheiro Físico/Carteira</option>
            </Select>
          </InputWrapper>
          {errors.type && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.type.message}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Saldo Inicial */}
        <InputGroup>
          <Label htmlFor="balance">Saldo Inicial / Limite (R$)</Label>
          <InputWrapper>
            <DollarSign />
            <Input
              id="balance"
              type="text"
              placeholder="0,00"
              $hasError={!!errors.balance}
              {...register('balance')}
            />
          </InputWrapper>
          {errors.balance && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.balance.message}
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
            'Registrando Conta...'
          ) : (
            <>
              Confirmar Registro <ArrowRight size={20} />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormCard>
  );
};
