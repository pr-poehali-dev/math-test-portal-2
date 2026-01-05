import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

type Question = {
  id: number;
  text: string;
  correctAnswer: string;
};

type TestVariant = {
  variant: number;
  questions: Question[];
};

type TeacherDashboardProps = {
  user: User;
  submissions: TestSubmission[];
  testVariants: TestVariant[];
  onLogout: () => void;
  onGradeSubmission: (submissionId: string, score: number) => void;
  getLeaderboard: () => TestSubmission[];
};

export const TeacherDashboard = ({ 
  user, 
  submissions, 
  testVariants, 
  onLogout, 
  onGradeSubmission,
  getLeaderboard 
}: TeacherDashboardProps) => {
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
          <Button variant="outline" onClick={onLogout}>
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
                          onClick={() => onGradeSubmission(submission.id, score)}
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
};
