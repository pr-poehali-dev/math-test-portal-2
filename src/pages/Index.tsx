import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoginScreen } from '@/components/LoginScreen';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { TestTaking } from '@/components/TestTaking';
import { StudentDashboard } from '@/components/StudentDashboard';

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

  const handleLogout = () => {
    setUser(null);
    setCurrentTest(null);
    setAnswers([]);
  };

  if (!user) {
    return (
      <LoginScreen 
        nameInput={nameInput}
        setNameInput={setNameInput}
        onLogin={handleLogin}
      />
    );
  }

  if (user.isTeacher) {
    return (
      <TeacherDashboard
        user={user}
        submissions={submissions}
        testVariants={testVariants}
        onLogout={handleLogout}
        onGradeSubmission={handleGradeSubmission}
        getLeaderboard={getLeaderboard}
      />
    );
  }

  if (currentTest !== null) {
    return (
      <TestTaking
        user={user}
        currentTest={currentTest}
        variant={testVariants[currentTest - 1]}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        onCancel={() => setCurrentTest(null)}
        onSubmit={handleSubmitTest}
      />
    );
  }

  return (
    <StudentDashboard
      user={user}
      testVariants={testVariants}
      submissions={submissions}
      onLogout={handleLogout}
      onStartTest={handleStartTest}
      getLeaderboard={getLeaderboard}
    />
  );
};

export default Index;
