
import { Field, Label } from '../../fieldset'
import { Heading } from '../../heading'
import { Input } from '../../input'
import { Button } from '../../button'
import { useState } from 'react';

export function FormBranch(props) {
    const [name, setName]  = useState(null)
    const handleSave=()=>{
      console.log("Saving")
      props.handleClick()
    }
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10 my-5">
      <Heading>Información de Sede</Heading>
    </div>
    <Field>
      <Label>Nombre de la sede*</Label>
      <Input name="name" onChange={(e)=>setName(e.target.value)}/>
      <Label>Id Sede</Label>
      <Input name="id"  value="id1" disabled/>
    <Button onClick={handleSave} disabled={!name} className="my-10 mr-2" >Guardar</Button>    
    <Button onClick={props.handleClick} className="my-10 mr-2"  >Omitir este paso</Button>    
 </Field>
    </>
    
  )
}