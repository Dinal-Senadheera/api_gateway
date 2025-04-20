import {
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  COURSE_ENDPOINT = process.env.COURSE_SERVICE_ENDPOINT;
  ENROLLMENT_ENDPOINT = process.env.ENROLLMENT_SERVICE_ENDPOINT;
  PAYMENT_ENDPOINT = process.env.PAYMENT_SERVICE_ENDPOINT;
  NOTIFICATION_ENDPOINT = process.env.NOTIFICATION_ENDPOINT;
  AUTH_ENDPOINT = process.env.AUTH_SERVICE_ENDPOINT;

  @Get('/api/auth/*')
  async getAuth(@Req() req, @Res() res) {
    try {
      this.logger.debug(`Redirecting to auth service: ${req.originalUrl}`);
      const urlPath = req.originalUrl;

      // Special handling for the initial auth endpoint
      if (req.originalUrl === '/api/auth/google') {
        this.logger.debug('Processing OAuth redirect request');

        const response = await axios.get(`${this.AUTH_ENDPOINT}${urlPath}`, {
          headers: {
            Authorization: req.headers.authorization,
          },
          maxRedirects: 0,
          validateStatus: (status) => status >= 200 && status < 400,
        });

        if (response.status === 302 && response.headers.location) {
          this.logger.debug(`OAuth redirect to: ${response.headers.location}`);
          return res.redirect(302, response.headers.location);
        }
      }

      // Normal handling for all other endpoints
      const response = await axios.get(`${this.AUTH_ENDPOINT}${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug('Auth response received', {
        status: response.status,
        hasCookies: !!response.headers['set-cookie'],
      });

      if (response.headers && response.headers['set-cookie']) {
        res.setHeader('Set-Cookie', response.headers['set-cookie']);
      }

      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Auth service error: ${error.message}`, error.stack);
      this.logger.debug(
        `Auth service error details: ${JSON.stringify(error?.response?.data || {})}`,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Auth Service Down',
        }),
      });
    }
  }

  @Get('/api/user/*')
  async getUser(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to user/auth service');
      const urlPath = req.originalUrl;

      const response = await axios.get(`${this.AUTH_ENDPOINT}${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `User service response received: status ${response.status}`,
      );

      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`User service error: ${error.message}`, error.stack);
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - User/Auth Service Down',
        }),
      });
    }
  }

  @Get('/api/courses/*')
  async getCourses(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course service');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      this.logger.debug(`Course service path: ${urlPath}`);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      this.logger.debug(
        `Course service response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Course service error: ${error.message}`, error.stack);
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Get('/api/course-content/*')
  async getCourseContent(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course content service');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      this.logger.debug(`Course content path: ${urlPath}`);

      const response = await axios.get(`${this.COURSE_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      this.logger.debug(
        `Course content response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course content service error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Get('/api/course-progression/*')
  async getCourseProgression(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course progression service');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      this.logger.debug(`Course progression path: ${urlPath}`);

      const response = await axios.get(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );
      this.logger.debug(
        `Course progression response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course progression service error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Get('/api/payments/*')
  async getPayments(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to payment service');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      this.logger.debug(`Payment service path: ${urlPath}`);

      const response = await axios.get(`${this.PAYMENT_ENDPOINT}/${urlPath}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      this.logger.debug(
        `Payment service response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Payment service error: ${error.message}`, error.stack);
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Post('api/text-message-service/*')
  async sendTextMessage(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to text message service');
      const urlPath = req.originalUrl.replace(
        '/api/text-message-service',
        'text-message-service',
      );
      this.logger.debug(`Text message service path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Text message service response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Text message service error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Notification Service Down',
        }),
      });
    }
  }

  @Post('api/email-service/*')
  async sendEmail(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to email service');
      const urlPath = req.originalUrl.replace(
        '/api/email-service',
        'email-service',
      );
      this.logger.debug(`Email service path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.NOTIFICATION_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Email service response received: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(`Email service error: ${error.message}`, error.stack);
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Notification Service Down',
        }),
      });
    }
  }

  @Post('api/courses/*')
  async createCourse(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course service (create)');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      this.logger.debug(`Course service path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course service create response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course service create error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Post('api/course-content/*')
  async createCourseContent(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course content service (create)');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      this.logger.debug(`Course content path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course content create response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course content create error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Post('api/course-progression/*')
  async createCourseProgression(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course progression service (create)');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      this.logger.debug(`Course progression path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course progression create response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course progression create error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Post('api/payments/*')
  async createPayment(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to payment service (create)');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      this.logger.debug(`Payment service path: ${urlPath}`);

      const response = await axios({
        method: 'post',
        url: `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Payment service create response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Payment service create error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Patch('api/courses/*')
  async updateCourse(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course service (update)');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      this.logger.debug(`Course service path: ${urlPath}`);

      const response = await axios({
        method: 'patch',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course service update response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course service update error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Patch('api/course-content/*')
  async updateCourseContent(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course content service (update)');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      this.logger.debug(`Course content path: ${urlPath}`);

      const response = await axios({
        method: 'patch',
        url: `${this.COURSE_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course content update response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course content update error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Patch('api/course-progression/*')
  async updateCourseProgression(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course progression service (update)');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      this.logger.debug(`Course progression path: ${urlPath}`);

      const response = await axios({
        method: 'patch',
        url: `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Course progression update response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course progression update error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Patch('api/payments/*')
  async updatePayment(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to payment service (update)');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      this.logger.debug(`Payment service path: ${urlPath}`);

      const response = await axios({
        method: 'patch',
        url: `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        data: req.body,
        headers: {
          Authorization: req.headers.authorization,
        },
      });

      this.logger.debug(
        `Payment service update response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Payment service update error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }

  @Delete('api/courses/*')
  async deleteCourse(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course service (delete)');
      const urlPath = req.originalUrl.replace('/api/courses', 'courses');
      this.logger.debug(`Course service path: ${urlPath}`);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );

      this.logger.debug(
        `Course service delete response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course service delete error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Delete('api/course-content/*')
  async deleteCourseContent(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course content service (delete)');
      const urlPath = req.originalUrl.replace(
        '/api/course-content',
        'course-content',
      );
      this.logger.debug(`Course content path: ${urlPath}`);

      const response = await axios.delete(
        `${this.COURSE_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );

      this.logger.debug(
        `Course content delete response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course content delete error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Course Service Down',
        }),
      });
    }
  }

  @Delete('api/course-progression/*')
  async deleteCourseProgression(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to course progression service (delete)');
      const urlPath = req.originalUrl.replace(
        '/api/course-progression',
        'course-progression',
      );
      this.logger.debug(`Course progression path: ${urlPath}`);

      const response = await axios.delete(
        `${this.ENROLLMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );

      this.logger.debug(
        `Course progression delete response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Course progression delete error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Enrollment Service Down',
        }),
      });
    }
  }

  @Delete('api/payments/*')
  async deletePayment(@Req() req, @Res() res) {
    try {
      this.logger.debug('Redirecting to payment service (delete)');
      const urlPath = req.originalUrl.replace('/api/payments', 'payments');
      this.logger.debug(`Payment service path: ${urlPath}`);

      const response = await axios.delete(
        `${this.PAYMENT_ENDPOINT}/${urlPath}`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      );

      this.logger.debug(
        `Payment service delete response: status ${response.status}`,
      );
      return res.status(response.status).send(response.data);
    } catch (error) {
      this.logger.error(
        `Payment service delete error: ${error.message}`,
        error.stack,
      );
      return res.status(error?.response?.data?.statusCode || 500).send({
        ...(error?.response?.data || {
          message: 'Internal Server Error - Payment Service Down',
        }),
      });
    }
  }
}
