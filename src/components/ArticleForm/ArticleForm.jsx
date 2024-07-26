import { useForm, useFieldArray } from 'react-hook-form';
import classNames from 'classnames';

import SubmitButton from '../../components/SubmitButton';

import classes from './ArticleForm.module.scss';

const ArticleForm = ({ submitHandler, fetchedArticles }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: fetchedArticles?.article?.title || '',
      description: fetchedArticles?.article?.description || '',
      text: fetchedArticles?.article?.body || '',
      tagList: fetchedArticles?.article?.tagList?.map((tag) => ({
        name: tag,
      })) || [{ name: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const onSubmit = (submitData) => {
    const { title, description, text, tagList } = submitData;

    submitHandler({
      article: {
        title,
        description,
        body: text,
        tagList: tagList.map((tag) => tag.name),
      },
    });
  };

  return (
    <div className={classes.article}>
      <form className={classes.formInput} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.head}>Create new article</h2>
        <label className={classes.label}>
          Title
          <input
            className={classNames({
              [classes.input]: true,
              [classes.error]: errors.title,
            })}
            placeholder='Title'
            type='text'
            {...register('title', {
              required: 'Title is required',
              pattern: {
                value: 1000,
                message: 'Contains no more than 1000 words',
              },
            })}
          />
        </label>
        <p className={classes.errorText}>
          {errors?.title?.message?.toString()}
        </p>
        <label className={classes.label}>
          Short description
          <input
            className={classNames({
              [classes.input]: true,
              [classes.error]: errors.description,
            })}
            placeholder='Short description'
            type='text'
            {...register('description', {
              required: 'Short description is required',
            })}
          />
        </label>
        <label className={classes.label}>
          Text
          <textarea
            className={classNames({
              [classes.input]: true,
              [classes.inputTextArea]: true,
              [classes.error]: errors.description,
            })}
            placeholder='Text'
            type='textarea'
            {...register('text', {
              required: 'Text is required',
            })}
          />
        </label>
        <label className={classes.label}>
          Tags
          {fields.map((field, index) => (
            <div key={field.id} className={classes.tags}>
              <input
                className={classNames(classes.input, classes.tag)}
                type='text'
                placeholder='Tag'
                defaultValue={''}
                {...register(`tagList.${index}.name`, {
                  required: 'Tag is required',
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: 'Use only English letters and numbers',
                  },
                  validate: (tagValue) =>
                    !getValues()
                      .tagList.map((tagObject) => tagObject.name)
                      .filter((_, currentTagIndex) => index !== currentTagIndex)
                      .includes(tagValue) || 'Tag must be unique!',
                })}
              />
              <button
                className={classNames(classes.button, classes.delete)}
                onClick={() => remove(index)}
              >
                Delete
              </button>
              {fields.length - 1 === index && (
                <button
                  className={classNames(classes.button, classes.add)}
                  onClick={() => append({ name: '' })}
                >
                  Add tag
                </button>
              )}
            </div>
          ))}
        </label>
        <SubmitButton title={'Send'} />
      </form>
    </div>
  );
};

export default ArticleForm;
