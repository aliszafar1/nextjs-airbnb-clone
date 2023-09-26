'use client';

import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./modal";
import Heading from "../heading";
import Input from "../inputs/input";
import Button from "../button";

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setisLoading] = useState(false);
    const LoginModal = useLoginModal();

    const onToggle = useCallback(() => {
        loginModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ((data) => {
    setisLoading(true);
    signIn('credentials', {...data, redirect: false,})
    .then((cb => { 
        setisLoading(false);
        if(cb?.ok){
            toast.success('Logged in');
            router.refresh();
            LoginModal.onClose();
        }
        if(cb?.error){
            toast.error(cb.error);
        }
    }));
  })

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading
            title="Welcome back"
            subtitle="Login to your account!"
        />
        <Input 
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input 
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  )
    return (
        <Modal 
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;