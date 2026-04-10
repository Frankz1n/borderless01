import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  ArrowDownToLine,
  AlertCircle, 
  DollarSign, 
  AlignLeft, 
  Tags,
  CalendarDays
} from 'lucide-react';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  FormCard,
  Form,
  InputGroup,
  Label,
  InputWrapper,
  Input,
  TextArea,
  ErrorMessage,
  SubmitButton
} from './styles';

// All fields kept as strings — convert amount to number manually in onSubmit
const incomeSchema = z.object({
  amount: z.string().min(1, 'O valor é obrigatório'),
  description: z.string().optional(),
  category: z.string().optional(),
  transactionDate: z.string().min(1, 'A data da entrada é obrigatória'),
});

type IncomeFormInputs = z.infer<typeof incomeSchema>;

export const IncomeRegistrationScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IncomeFormInputs>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: '',
      description: '',
      category: '',
      transactionDate: ''
    }
  });

  const onSubmit = async (data: IncomeFormInputs) => {
    try {
      if (!auth.currentUser) {
        alert('Você precisa estar logado para registrar atividades.');
        return;
      }

      const amount = Number(data.amount.replace(',', '.'));
      if (isNaN(amount) || amount <= 0) {
        alert('Por favor, insira um valor válido maior que zero.');
        return;
      }

      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        type: 'entrance',
        amount,
        description: data.description || '',
        category: data.category || '',
        transactionDate: data.transactionDate,
        createdAt: new Date().toISOString()
      });

      alert('Entrada cadastrada com sucesso!');
      reset();
    } catch (error: any) {
      console.error('Erro ao registrar entrada:', error);
      alert('Erro ao registrar a entrada: ' + error.message);
    }
  };

  return (
    <FormCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Valor - Obrigatório */}
        <InputGroup>
          <Label htmlFor="amount">Valor Recebido (R$)*</Label>
          <InputWrapper>
            <DollarSign />
            <Input
              id="amount"
              type="text"
              placeholder="0,00"
              $hasError={!!errors.amount}
              {...register('amount')}
            />
          </InputWrapper>
          {errors.amount && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.amount.message}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Descrição - Opcional */}
        <InputGroup>
          <Label htmlFor="description">Descrição</Label>
          <InputWrapper>
            <AlignLeft style={{ top: '1rem', alignItems: 'flex-start' }} />
            <TextArea
              id="description"
              placeholder="Ex: Salário da empresa, Pix do João..."
              $hasError={!!errors.description}
              {...register('description')}
            />
          </InputWrapper>
          {errors.description && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.description.message}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Categoria - Opcional */}
        <InputGroup>
          <Label htmlFor="category">Categoria</Label>
          <InputWrapper>
            <Tags />
            <Input
              id="category"
              type="text"
              placeholder="Ex: Salário, Rendimentos, Presentes..."
              $hasError={!!errors.category}
              {...register('category')}
            />
          </InputWrapper>
          {errors.category && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.category.message}
            </ErrorMessage>
          )}
        </InputGroup>

        {/* Data - Obrigatório */}
        <InputGroup>
          <Label htmlFor="transactionDate">Data da Entrada*</Label>
          <InputWrapper>
            <CalendarDays />
            <Input
              id="transactionDate"
              type="date"
              $hasError={!!errors.transactionDate}
              {...register('transactionDate')}
            />
          </InputWrapper>
          {errors.transactionDate && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.transactionDate.message}
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
            'Registrando...'
          ) : (
            <>
              Confirmar Recebimento <ArrowDownToLine size={20} />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormCard>
  );
};
