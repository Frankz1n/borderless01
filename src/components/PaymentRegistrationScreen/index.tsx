import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  ArrowRight, 
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

const paymentSchema = z.object({
  amount: z.string()
    .min(1, 'O valor é obrigatório')
    .transform((val) => Number(val.replace(',', '.')))
    .refine((val) => !isNaN(val) && val > 0, { message: 'Por favor, insira um valor válido maior que zero.' }),
  description: z.string().optional(),
  category: z.string().optional(),
  paymentDate: z.string().min(1, 'A data de pagamento é obrigatória'),
});

type PaymentFormInputs = z.infer<typeof paymentSchema>;

export const PaymentRegistrationScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: '' as any,
      description: '',
      category: '',
      paymentDate: ''
    }
  });

  const onSubmit = async (data: PaymentFormInputs) => {
    try {
      if (!auth.currentUser) {
        alert('Você precisa estar logado para criar um registro.');
        return;
      }

      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        type: 'payment',
        amount: data.amount,
        description: data.description || '',
        category: data.category || '',
        paymentDate: data.paymentDate,
        createdAt: new Date().toISOString()
      });

      alert('Pagamento registrado com sucesso!');
      reset();
    } catch (error: any) {
      console.error('Erro ao registrar pagamento:', error);
      alert('Erro ao registrar o pagamento: ' + error.message);
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
          <Label htmlFor="amount">Valor do Pagamento (R$)*</Label>
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
              placeholder="Ex: Conta de luz da casa..."
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
              placeholder="Ex: Moradia, Alimentação, Lazer..."
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

        {/* Data de Pagamento - Obrigatório */}
        <InputGroup>
          <Label htmlFor="paymentDate">Data de Pagamento*</Label>
          <InputWrapper>
            <CalendarDays />
            <Input
              id="paymentDate"
              type="date"
              $hasError={!!errors.paymentDate}
              {...register('paymentDate')}
            />
          </InputWrapper>
          {errors.paymentDate && (
            <ErrorMessage initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <AlertCircle /> {errors.paymentDate.message}
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
              Confirmar Pagamento <ArrowRight size={20} />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormCard>
  );
};
