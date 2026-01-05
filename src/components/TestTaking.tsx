import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type User = {
  name: string;
  isTeacher: boolean;
};

type TestAnswer = {
  questionId: number;
  answer: string;
};

type Question = {
  id: number;
  text: string;
  correctAnswer: string;
};

type TestVariant = {
  variant: number;
  questions: Question[];
};

type TestTakingProps = {
  user: User;
  currentTest: number;
  variant: TestVariant;
  answers: TestAnswer[];
  onAnswerChange: (questionId: number, answer: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export const TestTaking = ({ 
  user, 
  currentTest, 
  variant, 
  answers, 
  onAnswerChange, 
  onCancel, 
  onSubmit 
}: TestTakingProps) => {
  const progress = (answers.length / variant.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Вариант {currentTest}</h1>
            <p className="text-muted-foreground">{user.name}</p>
          </div>
          <Button variant="outline" onClick={onCancel}>
            <Icon name="X" size={18} className="mr-2" />
            Отменить
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс выполнения</span>
                <span className="font-medium">{answers.length} / {variant.questions.length}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-orange-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {variant.questions.map((question, idx) => (
            <Card key={question.id} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
                    {idx + 1}
                  </div>
                  Задание {idx + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap text-base leading-relaxed">{question.text}</p>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваш ответ:</label>
                  <textarea
                    className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Введите ваш ответ..."
                    value={answers.find(a => a.questionId === question.id)?.answer || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={onSubmit}
          disabled={answers.length !== variant.questions.length}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg h-14"
        >
          <Icon name="Send" size={20} className="mr-2" />
          Отправить на проверку
        </Button>
      </div>
    </div>
  );
};
