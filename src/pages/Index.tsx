import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type User = {
  name: string;
  isTeacher: boolean;
};

type TestAnswer = {
  questionId: number;
  answer: string;
};

type TestSubmission = {
  id: string;
  studentName: string;
  variant: number;
  answers: TestAnswer[];
  score: number | null;
  submittedAt: Date;
  checkedBy?: string;
};

const testVariants = [
  {
    variant: 1,
    questions: [
      {
        id: 1,
        text: 'Найдите значение выражений:\n(24 + 16) + 38 =\n34 + (21 + 16) + 55 =',
        correctAnswer: '(24 + 16) + 38 = 78\n34 + (21 + 16) + 55 = 126'
      },
      {
        id: 2,
        text: 'Не выполняя вычислений назовите большую из сумм:\n242 + 16 или 224 + 12',
        correctAnswer: '242 + 16 больше, чем 224 + 12'
      },
      {
        id: 3,
        text: 'У треугольника AOD сторона AO меньше стороны OD на 2 см и на 1 см больше стороны AD. Вычислите периметр этого треугольника если сторона AD равна 8 см.',
        correctAnswer: '24 см'
      },
      {
        id: 4,
        text: 'В саду росли абрикосы вишни и черешни. Всего 48 фруктовых деревьев. Абрикос росло на 8 меньше, чем вишен. Сколько черешен росло в саду, если известно, что вишен росло 18?',
        correctAnswer: '20 черешен'
      },
      {
        id: 5,
        text: 'Вычислите:\n169 - (51 + 18) + 41 - 24 =',
        correctAnswer: '117'
      }
    ]
  },
  {
    variant: 2,
    questions: [
      {
        id: 1,
        text: 'Найдите значение выражений:\n(53 + 12) + 37 =\n18 + (44 + 21) + 72 =',
        correctAnswer: '(53 + 12) + 37 = 102\n18 + (44 + 21) + 72 = 155'
      },
      {
        id: 2,
        text: 'Не выполняя вычислений назовите большую из сумм:\n194 + 29 или 211 + 18',
        correctAnswer: '211 + 18 больше 194 + 29'
      },
      {
        id: 3,
        text: 'У треугольника ABC сторона BC на 3 см больше, чем сторона AB и на 2 см меньше чем AC. Найдите периметр треугольника, если сторона BC равна 5 см.',
        correctAnswer: '14 см'
      },
      {
        id: 4,
        text: 'В трех начальных классах школы всего 91 учеников. В первом классе 28 учеников, во втором на 4 больше. Сколько учеников в третьем классе?',
        correctAnswer: '31 ученик'
      },
      {
        id: 5,
        text: 'Вычислите:\n191 - (74 + 62) + 29 - 18 =',
        correctAnswer: '66'
      }
    ]
  },
  {
    variant: 3,
    questions: [
      {
        id: 1,
        text: 'Найдите значение выражений:\n(31 + 52) + 11 =\n92 + (43 + 15) + 48 =',
        correctAnswer: '(31 + 52) + 11 = 94\n92 + (43 + 15) + 48 = 198'
      },
      {
        id: 2,
        text: 'Не выполняя вычислений назовите большую из сумм:\n182 + 72 или 159 + 64',
        correctAnswer: '182 + 72 больше чем 159 + 64'
      },
      {
        id: 3,
        text: 'Одна из сторон участка треугольной формы равна 12 метров, вторая на 4 метра больше, а третья на 2 метра меньше, чем вторая. Найдите периметр участка.',
        correctAnswer: '42 метра'
      },
      {
        id: 4,
        text: 'На овощную базу завезли картофель, лук и капусту, всего 356 кг. Картофеля завезли на 51 кг больше чем капусты. Сколько лука завезли на овощную базу, если капусты завезли 91 кг?',
        correctAnswer: '123 кг'
      },
      {
        id: 5,
        text: 'Вычислите:\n391 - (29 + 18 - 13) - (27 + 16) =',
        correctAnswer: '314'
      }
    ]
  },
  {
    variant: 4,
    questions: [
      {
        id: 1,
        text: 'Решите примеры:\n67 + (71 - 56) =\n(39 + 14) + (39 + 22) =',
        correctAnswer: '67 + (71 - 56) = 82\n(39 + 14) + (39 + 22) = 114'
      },
      {
        id: 2,
        text: 'Сравните не выполняя вычислений:\n735 + 471 или 633 + 341',
        correctAnswer: '735 + 471 больше чем 633 + 341'
      },
      {
        id: 3,
        text: 'Одна из сторон треугольника равна 39 см вторая на 16 см меньше, а третья на 11 см больше чем вторая. Вычислите периметр треугольника.',
        correctAnswer: '96 см'
      },
      {
        id: 4,
        text: 'Туристы за 3 дня преодолели 61 км. В первый день они прошли 12 км, во второй на 3 км меньше. Весь остальной путь они проехали на автобусе за третий день. Какое расстояние преодолели туристы за третий день?',
        correctAnswer: '40 км'
      },
      {
        id: 5,
        text: 'Вычислите:\n562 - (49 - 18 + 11) + (51 - 42) =',
        correctAnswer: '529'
      }
    ]
  }
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [submissions, setSubmissions] = useState<TestSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedSubmissions = localStorage.getItem('mathTestSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions, (key, value) => {
        if (key === 'submittedAt') return new Date(value);
        return value;
      }));
    }
  }, []);

  const handleLogin = () => {
    if (!nameInput.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите ваше имя',
        variant: 'destructive'
      });
      return;
    }

    const isTeacher = nameInput.toLowerCase() === 'никитовский учитель';
    setUser({ name: nameInput, isTeacher });
    
    toast({
      title: isTeacher ? '👨‍🏫 Добро пожаловать, Учитель!' : '👋 Привет!',
      description: isTeacher ? 'Доступ к панели проверки открыт' : `${nameInput}, выбери вариант теста`
    });
  };

  const handleStartTest = (variantNum: number) => {
    setCurrentTest(variantNum);
    setAnswers([]);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const handleSubmitTest = () => {
    if (!user || currentTest === null) return;

    const submission: TestSubmission = {
      id: Date.now().toString(),
      studentName: user.name,
      variant: currentTest,
      answers,
      score: null,
      submittedAt: new Date()
    };

    const newSubmissions = [...submissions, submission];
    setSubmissions(newSubmissions);
    localStorage.setItem('mathTestSubmissions', JSON.stringify(newSubmissions));

    toast({
      title: '🎉 Тест отправлен!',
      description: 'Ожидайте проверки учителя'
    });

    setCurrentTest(null);
    setAnswers([]);
  };

  const handleGradeSubmission = (submissionId: string, score: number) => {
    const newSubmissions = submissions.map(s => 
      s.id === submissionId 
        ? { ...s, score, checkedBy: user?.name }
        : s
    );
    setSubmissions(newSubmissions);
    localStorage.setItem('mathTestSubmissions', JSON.stringify(newSubmissions));

    toast({
      title: '✅ Работа проверена',
      description: `Выставлено баллов: ${score}`
    });
  };

  const getLeaderboard = () => {
    return submissions
      .filter(s => s.score !== null)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-scale-in shadow-2xl border-2">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce-in">
              <Icon name="Calculator" size={40} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              Математика 6 класс
            </CardTitle>
            <CardDescription className="text-base">
              Тесты по работе с дробями
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ваше имя</label>
              <Input
                placeholder="Введите ваше имя..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="text-base"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-lg h-12"
            >
              <Icon name="LogIn" size={20} className="mr-2" />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.isTeacher) {
    const unchecked = submissions.filter(s => s.score === null);
    const checked = submissions.filter(s => s.score !== null);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 p-4">
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-600 rounded-full flex items-center justify-center">
                <Icon name="GraduationCap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Панель учителя</h1>
                <p className="text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setUser(null)}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>

          <Tabs defaultValue="unchecked" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="unchecked" className="gap-2">
                <Icon name="Clock" size={16} />
                Непроверенные ({unchecked.length})
              </TabsTrigger>
              <TabsTrigger value="checked" className="gap-2">
                <Icon name="CheckCircle" size={16} />
                Проверенные ({checked.length})
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-2">
                <Icon name="Trophy" size={16} />
                Таблица лидеров
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unchecked" className="space-y-4">
              {unchecked.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-500" />
                    <p className="text-lg font-medium">Все работы проверены!</p>
                  </CardContent>
                </Card>
              ) : (
                unchecked.map(submission => (
                  <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} className="text-purple-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                            <CardDescription>
                              Вариант {submission.variant} • {submission.submittedAt.toLocaleString('ru-RU')}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">Ожидает проверки</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {testVariants[submission.variant - 1].questions.map((q, idx) => {
                        const studentAnswer = submission.answers.find(a => a.questionId === q.id);
                        return (
                          <div key={q.id} className="space-y-2 p-4 bg-muted/50 rounded-lg">
                            <p className="font-medium">Задание {idx + 1}</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{q.text}</p>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-green-600">✓ Правильный ответ:</p>
                              <p className="text-sm bg-green-50 p-2 rounded">{q.correctAnswer}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Ответ ученика:</p>
                              <p className="text-sm bg-white p-2 rounded border">{studentAnswer?.answer || 'Не ответил'}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex gap-2 pt-4">
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <Button
                            key={score}
                            onClick={() => handleGradeSubmission(submission.id, score)}
                            variant={score >= 3 ? "default" : "destructive"}
                            className="flex-1"
                          >
                            {score} баллов
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="checked" className="space-y-4">
              {checked.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="FileQuestion" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Проверенных работ пока нет</p>
                  </CardContent>
                </Card>
              ) : (
                checked.map(submission => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} className="text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                            <CardDescription>
                              Вариант {submission.variant} • {submission.submittedAt.toLocaleString('ru-RU')}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={`text-lg px-4 py-1 ${
                          (submission.score || 0) >= 4 ? 'bg-green-500' : 
                          (submission.score || 0) >= 3 ? 'bg-orange-500' : 'bg-red-500'
                        }`}>
                          {submission.score} / 5
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={24} className="text-yellow-500" />
                    Лучшие результаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getLeaderboard().length === 0 ? (
                    <div className="py-12 text-center">
                      <Icon name="Trophy" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium">Результатов пока нет</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getLeaderboard().map((submission, idx) => (
                        <div
                          key={submission.id}
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            idx === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400' :
                            idx === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-400' :
                            idx === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-400' :
                            'bg-muted/50'
                          }`}
                        >
                          <div className="text-2xl font-bold w-8">
                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">Вариант {submission.variant}</p>
                          </div>
                          <Badge className="text-lg px-4 py-1 bg-purple-600">
                            {submission.score} баллов
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (currentTest !== null) {
    const variant = testVariants[currentTest - 1];
    const progress = (answers.length / variant.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 p-4">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Вариант {currentTest}</h1>
              <p className="text-muted-foreground">{user.name}</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentTest(null)}>
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
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={handleSubmitTest}
            disabled={answers.length !== variant.questions.length}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg h-14"
          >
            <Icon name="Send" size={20} className="mr-2" />
            Отправить на проверку
          </Button>
        </div>
      </div>
    );
  }

  const mySubmissions = submissions.filter(s => s.studentName === user.name);
  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-600 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Привет, {user.name}! 👋</h1>
              <p className="text-muted-foreground">Выбери вариант теста</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setUser(null)}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testVariants.map((variant) => {
            const attempted = mySubmissions.find(s => s.variant === variant.variant);
            return (
              <Card 
                key={variant.variant}
                className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer border-2"
                onClick={() => !attempted && handleStartTest(variant.variant)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Вариант {variant.variant}</CardTitle>
                    {attempted && (
                      <Badge className={
                        attempted.score === null ? 'bg-orange-500' :
                        (attempted.score || 0) >= 4 ? 'bg-green-500' :
                        (attempted.score || 0) >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                      }>
                        {attempted.score === null ? 'На проверке' : `${attempted.score} / 5`}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>5 заданий по математике</CardDescription>
                </CardHeader>
                <CardContent>
                  {attempted ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Отправлено: {attempted.submittedAt.toLocaleString('ru-RU')}
                      </p>
                      {attempted.score !== null && (
                        <p className="text-sm font-medium">
                          Проверил: {attempted.checkedBy}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                      <Icon name="Play" size={18} className="mr-2" />
                      Начать тест
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Trophy" size={24} className="text-yellow-500" />
              Таблица лидеров
            </CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="py-8 text-center">
                <Icon name="Trophy" size={40} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Пока нет результатов</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((submission, idx) => (
                  <div
                    key={submission.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      submission.studentName === user.name ? 'bg-purple-100 border-2 border-purple-400' :
                      idx === 0 ? 'bg-yellow-50' :
                      idx === 1 ? 'bg-gray-50' :
                      idx === 2 ? 'bg-orange-50' :
                      'bg-muted/30'
                    }`}
                  >
                    <div className="text-xl w-6">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{submission.studentName}</p>
                    </div>
                    <Badge className="bg-purple-600">{submission.score} баллов</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
