import {useForm} from 'react-hook-form'
import ErrorInfo from './ErrorInfo'
import { DraftPatient} from '../types'
import { usePatientStore } from '../store/store'
import { useEffect } from 'react'


export default function PatientForm() {

    const {addPatient, activeId, patients, updatePatient} = usePatientStore()

    const {register, handleSubmit, setValue, formState : {errors}, reset} = useForm<DraftPatient>()

    useEffect(() => {
        if(activeId){
            const activePatient = patients.filter(patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    },[activeId, patients, setValue])

    const registerPatient = (data : DraftPatient) => {
        if(activeId){
            updatePatient(data)
        }else{
            addPatient(data); 
        }
       reset()
    }
   
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name',{
                            required: 'El nombre del paciente es obligatorio.',
                            maxLength : {value : 15, message: 'El nombre no puede tener más de 15 caracteres.'}
                        })}
                    />
                   
                    {
                    errors.name && (
                        <ErrorInfo>{errors.name?.message}</ErrorInfo>
                    )}
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario"
                      {...register('caretaker', {
                        required: 'El nombre del propietario es obligatorio',
                        maxLength: {value: 15, message: 'El nombre del propietario no puede tener más de 15 caracteres.'}
                      })} 
                  />
                </div>
                    {
                    errors.caretaker && (
                        <ErrorInfo>{errors.caretaker?.message}</ErrorInfo>
                    )
                    }
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro"
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email No Válido'
                        }
                      })}  
                />
              </div>

              {
                errors.email && (
                    <ErrorInfo>{errors.email?.message}</ErrorInfo>
                )
              }
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date"
                      {...register('date', {
                        required : 'La fecha de alta es obligatoria'
                      })} 
                  />
              </div>

              {
              errors.date && (
                <ErrorInfo>{errors.date?.message}</ErrorInfo>
              )
              }
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente"
                      {...register('symptoms', {
                        required : 'Los síntomas son obligatorios'
                      })} 
                  ></textarea>
              </div>
                    {
                        errors.symptoms && (
                            <ErrorInfo>{errors.symptoms.message}</ErrorInfo>
                        )
                    }
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }