import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({
  link: z.string().url(),
  news: z.string(),
  model: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function Home() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      model: 'CyberPeace-Institute/SecureBERT-NER',
    },
  });

  async function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="bg-zinc-900 min-h-screen text-neutral-200">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-neutral-200 font-bold">Cyber</h1>
        <div>
          <section className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="grid gap-2 flex-1">
                  <Label>Link: </Label>
                  <Input {...register('link')} type="url" />
                  {errors.link && (
                    <span className="font-medium text-red-500">{errors?.link?.message}</span>
                  )}
                </div>
                <Controller
                  name="model"
                  control={control}
                  render={({ field: { onChange, value, disabled } }) => (
                    <Select
                      defaultValue="CyberPeace-Institute/SecureBERT-NER"
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="w-[200px] mt-6">
                        <SelectValue placeholder="Modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CyberPeace-Institute/SecureBERT-NER">
                          CyberPeace-Institute/SecureBERT-NER
                        </SelectItem>
                        <SelectItem value="danitamayo/bert-cybersecurity-NER">
                          danitamayo/bert-cybersecurity-NER
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <div className="grid gap-2">
                  <Label>Noticia: </Label>
                  <Textarea {...register('news')} />
                  {errors.news && (
                    <span className="font-medium text-red-500">{errors?.news?.message}</span>
                  )}
                </div>
              </div>
              <Button type="submit">Enviar</Button>
            </form>
          </section>
          <section></section>
        </div>
      </div>
    </div>
  );
}
