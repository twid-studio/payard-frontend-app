import React, { useEffect, useRef, useState } from "react";
import s from "./Form.module.scss";
import { ErrorMessage, Field, Form, Formik, getIn } from "formik";

import * as Yup from "yup";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { anim, ContactAnim } from "@/lib/helpers/anim";
import Link from "next/link";

const validationSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required("Please enter a valid email or phone number")
    .test(
      "emailOrPhone",
      "Please enter a valid email or phone number",
      (value) => {
        const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
        const isPhone =
          /^(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/.test(value);
        return isEmail || isPhone;
      }
    ),
  topic: Yup.string(),
  message: Yup.string(),
});

const downloadContent = [
  {
    icon: "/images/contact/appStore/appstore.svg",
    link: "",
  },
  {
    icon: "/images/contact/appStore/googleplay.svg",
    link: "",
  },
  {
    icon: "/images/contact/appStore/fb.svg",
    link: "",
  },
  {
    icon: "/images/contact/appStore/in.svg",
    link: "",
  },
];

export default function FormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);

  const contactRef = useRef();

  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["0% 100%", "0% 0%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtTop(latest >= 0.85);
  });


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await console.log(values);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm(); // This will reset all form values to their initial state
      }, 2000);
    }
  };

  return (
    <section className={s.contact_wrapper} ref={contactRef}>
      <motion.div
        className={clsx(s.contact, {
          [s.contact_sucess]: isSubmitted,
          [s.contact_colorChange]: isAtTop,
        })}
      >
        <div className={s.top}>
          <h1>
            Ping us,
            <br />
            we&#8217;re here for you
          </h1>
          <p className={"shadow"}>
            Our dedicated team says &quot;Hi&quot;! Reach out with any questions or for
            support, and we&apos;ll ensure you get the assistance you need
          </p>
        </div>
        <AnimatePresence mode="wait">
          {isSubmitted && (
            <motion.div className={s.submited} {...anim(ContactAnim.sucess)}>
              <h1>Thank you!</h1>
              <p>Will get back to your shortly.</p>
              <motion.div {...anim(ContactAnim.sucessIcon)} className={s.icon}>
                <Image src="/images/contact/sucessIcon.png" fill alt="" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Formik
          initialValues={{
            emailOrPhone: "",
            topic: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={s.form}>
              <motion.div className={s.form_input_wrapper}>
                <p className="small-text">Your email or phone number</p>
                <Field
                  type="text"
                  name="emailOrPhone"
                  className={clsx(s.form_input, {
                    [s.form_input__error]:
                      getIn(formik.errors, "emailOrPhone") &&
                      getIn(formik.touched, "emailOrPhone"),
                  })}
                />
                <ErrorMessage
                  name="emailOrPhone"
                  component="p"
                  className={"small-text " + s.form_input_error_msg}
                />
              </motion.div>

              <motion.div className={s.form_input_wrapper}>
                <p className="small-text">Topic</p>
                <Field type="text" name="topic" className={s.form_input} />
              </motion.div>

              <motion.div
                className={`${s.form_input_wrapper} ${s.form_input_textarea}`}
              >
                <p className="small-text">Message</p>
                <Field
                  as="textarea"
                  name="message"
                  className={`${s.form_input}`}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={
                  formik.isSubmitting || !formik.isValid || !formik.dirty
                }
                className={clsx(s.button, s.mainButton, {
                  [s.button_disabled]:
                    formik.isSubmitting || !formik.isValid || !formik.dirty,
                })}
              >
                Submit
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
      <div className={s.socials}>
        {downloadContent.map((currIcon, i) => (
          <Link href={currIcon.link} key={i} target="_blank" className={s.item}>
            <img src={currIcon.icon} className={s.icon} alt="" />
          </Link>
        ))}
      </div>
    </section>
  );
}
