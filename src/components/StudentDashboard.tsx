import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type User = {
  name: string;
  isTeacher: boolean;
};

type TestSubmission = {
  id: string;
  studentName: string;
  variant: number;
  answers: any[];
  score: number | null;
  submittedAt: Date;
  checkedBy?: string;
};

type TestVariant = {
  variant: number;
  questions: any[];
};

type StudentDashboardProps = {
  user: User;
  testVariants: TestVariant[];
  submissions: TestSubmission[];
  onLogout: () => void;
  onStartTest: (variantNum: number) => void;
  getLeaderboard: () => TestSubmission[];
};

export const StudentDashboard = ({ 
  user, 
  testVariants, 
  submissions, 
  onLogout, 
  onStartTest,
  getLeaderboard 
}: StudentDashboardProps) => {
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
          <Button variant="outline" onClick={onLogout}>
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
                onClick={() => !attempted && onStartTest(variant.variant)}
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
