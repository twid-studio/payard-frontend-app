import React, { useContext, useEffect, useRef, useState } from "react";
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
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { DataContext } from "@/lib/providers/DataProvider/context";

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

  const { data: allData } = useContext(DataContext);
  const socials = allData.socials;
  const form = allData.form.formText;
  const sucessText = allData.form.sucessText;

  // #region

  const contactRef = useRef();

  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["0% 100%", "0% 0%"],
    layoutEffect: false,
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(80% 0% 0%)", "inset(0% 0% 0%)"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsAtTop(latest >= 0.85);
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values) {
        const response = await fetch("/api/sendMailAPI", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Success");
          console.log(values);
        } else {
          console.log("Faile");
        }
      }
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

  // #endregion

  return (
    <section className={s.contact_wrapper} ref={contactRef}>
      <motion.span style={{ clipPath }} className={s.bg} />

      <motion.div
        className={clsx(s.contact, {
          [s.contact_sucess]: isSubmitted,
          [s.contact_colorChange]: isAtTop,
        })}
        id="contact"
      >
        <Image
          src={sucessText.sucessIcon}
          width={100}
          height={100}
          alt=""
          data-lazy-image
        />
        <div className={s.top}>
          <h1 dangerouslySetInnerHTML={{ __html: form.title }} />
          <p className={"shadow"}>
            {form.subtitle}
          </p>
        </div>
        <AnimatePresence mode="wait">
          {isSubmitted && (
            <motion.div className={s.submited} {...anim(ContactAnim.sucess)}>
              <h1>{sucessText.sucessTitle}</h1>
              <p>{sucessText.sucessSubtitle}</p>
              <motion.div {...anim(ContactAnim.sucessIcon)} className={s.icon}>
                <Image src={sucessText.sucessIcon} fill alt="" />
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
              <div className={s.bottom}>
                <Link
                  scroll={true}
                  href={form.policyButton.link}
                  className={"small-text shadow " + s.privacyLink}
                >
                  {form.policyButton.title}
                </Link>

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
                  <span className={s.bg} />
                  Submit
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <div className={s.socials}>
        {socials.downloadLinks.map((currIcon, i) => (
          <Link
            scroll={true}
            href={currIcon.link}
            key={i}
            target="_blank"
            className={s.item}
          >
            <Image src={currIcon.linkIcon} className={s.icon} alt="" fill />
          </Link>
        ))}
        {socials.socialsLinks.map((currIcon, i) => (
          <Link
            scroll={true}
            href={currIcon.link}
            key={i}
            target="_blank"
            className={`${s.item} ${s.item_socials}`}
          >
            <Image src={currIcon.linkIcon} className={s.icon} alt="" fill />
          </Link>
        ))}
      </div>
    </section>
  );
}
