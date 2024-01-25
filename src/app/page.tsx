'use client'
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import json from './anexo.json';
import { Button, Input } from '@mui/material';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { z } from 'zod'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from '@mui/lab/LoadingButton';

interface Option {
  id: number;
  nome: string;
}

interface IFormInput {
  pessoa: number | null;
  telefone: string | null;
  email: string
}

const validationForm = z.object({
  pessoa: z.number(),
  telefone: z.string(),
  email: z.string().email()

})

export default function Home() {

  const methods  = useForm<IFormInput>()
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    setLoading(false)
  }
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)

  function NestedInput({ label, ...rest }) {
    const { register } = useFormContext()
    return (
      <TextField
        label={label}
        {...register("pessoa")}
        {...rest}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-500">
          <form onSubmit={methods.handleSubmit(onSubmit)}
            className="w-1/2 h-2/5 justify-between bg-slate-600 rounded-md flex flex-col p-8"
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={json.map((option: Option) => ({ value: option.id, label: option.nome }))}
              sx={{ width: '100%' }}
              onChange={(event, value) => {
                methods.setValue("pessoa", value?.value || null);
              }}
              renderInput={(params) => {
                return (
                  <NestedInput
                  required
                  label="Nome"
                  {...params}
                />
                )
              }
            }
            />
            <TextField
              id="email" 
              type="email" 
              label="Email" 
              variant="filled"
              required
              placeholder="Email" 
              {...methods.register("email", { required: true })}
              />
            <PhoneInput
              required
              defaultCountry="BR"
              placeholder="Enter phone number"
              country="BR"
              value={value}
              onChange={(e)=>{
                setValue(e); 
                methods.setValue("telefone", e || null);}}
            />
            {
              loading ?
              <LoadingButton sx={{width: '100%'}} loading variant="outlined">
                Submit
              </LoadingButton>
              :
              <Button sx={{width: '100%'}} variant="contained" type="submit">
                Enviar
              </Button>
            }
          </form>
        </div>
      </main>
    </FormProvider>
  );
}
